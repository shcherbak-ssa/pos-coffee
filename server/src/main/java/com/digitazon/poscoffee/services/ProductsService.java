package com.digitazon.poscoffee.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.digitazon.poscoffee.configs.AppConfig;
import com.digitazon.poscoffee.models.Category;
import com.digitazon.poscoffee.models.Product;
import com.digitazon.poscoffee.models.helpers.PageResponse;
import com.digitazon.poscoffee.models.helpers.SearchProductsResult;
import com.digitazon.poscoffee.models.helpers.client.ClientCategory;
import com.digitazon.poscoffee.models.helpers.client.ClientProduct;
import com.digitazon.poscoffee.models.helpers.filters.ProductsFilter;
import com.digitazon.poscoffee.repositories.ProductsRepository;
import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.constants.ProductsConstants;
import com.digitazon.poscoffee.shared.exceptions.AlreadyExistException;
import com.digitazon.poscoffee.shared.exceptions.ResourceNotFoundException;
import com.digitazon.poscoffee.shared.helpers.LocalResourceLoader;
import com.digitazon.poscoffee.shared.types.BaseServiceHelpers;

@Service
public class ProductsService {

  // @TODO: conver to annotation
  private AnnotationConfigApplicationContext context
    = new AnnotationConfigApplicationContext(AppConfig.class);

  @Autowired
  private ProductsRepository repository;

  @Autowired
  private JdbcTemplate jdbcTemplate;

  private BaseServiceHelpers helpers;
  private String searchProductsSql;

  public ProductsService(@Autowired LocalResourceLoader localResourceLoader) throws IOException {
    this.helpers = (BaseServiceHelpers) this.context.getBean("serviceHelpers", AppConstants.Entity.PRODUCT);
    this.searchProductsSql = localResourceLoader.loadSqlScript(AppConstants.SQL_SEARCH_PRODUCTS);
  }

  public boolean isProductExist(String sku) {
    return this.repository.existsBySku(sku);
  }

  public Product findProductById(Long id) throws ResourceNotFoundException {
    final Optional<Product> foundProduct = this.repository.findById(id);

    if (foundProduct.isPresent()) {
      return foundProduct.get();
    }

    throw new ResourceNotFoundException("Product not found");
  }

  public ClientProduct findClientProductById(Long id) throws ResourceNotFoundException {
    final Optional<Product> foundProduct = this.repository.findById(id);

    if (foundProduct.isPresent()) {
      return this.convertToClientProduct(foundProduct.get());
    }

    throw new ResourceNotFoundException("Product not found");
  }

  public List<ClientProduct> getProducts(ProductsFilter filter) {
    final List<Product> products = this.repository.findAll(ProductsService.filter(filter));

    return products
      .stream()
      .map(this::convertToClientProduct)
      .collect(Collectors.toList());
  }

  public PageResponse<ClientProduct> getProductsByPage(ProductsFilter filter) {
    final Page<Product> productsPage = this.repository.findAll(
      ProductsService.filter(filter),
      PageRequest.of(filter.getPage(), filter.getPageSize())
    );

    if (productsPage.hasContent()) {
      return this.convertToPageResponse(productsPage, productsPage.getContent());
    }

    return this.convertToPageResponse(productsPage, new ArrayList<Product>());
  }

  public List<SearchProductsResult> searchProducts(String searchString) throws IOException {
    final String searchSql = this.searchProductsSql.replace(AppConstants.SQL_REPLACE_SYMBOL, searchString);

    return this.jdbcTemplate.query(searchSql, SearchProductsResult::parse);
  }

  public void countProductsByCategories(List<ClientCategory> categories) {
    for (ClientCategory clientCategory : categories) {
      final Category category = Category.builder()
        .id(clientCategory.getId())
        .build();

      final long productsCount = this.repository.countByCategory(category);
      clientCategory.setProductsCount(productsCount);
    }
  }

  public ClientProduct createProduct(ClientProduct productToCreate) throws AlreadyExistException {
    final Product product = this.convertToProduct(productToCreate);
    final Product createdProduct = this.createProduct(product);

    return this.convertToClientProduct(createdProduct);
  }

  public Product createProduct(Product productToCreate) throws AlreadyExistException {
    this.checkIfProductExists(productToCreate.getSku());

    productToCreate.setIsArchived(false);

    return this.repository.save(productToCreate);
  }

  public void updateProduct(ClientProduct updates) throws AlreadyExistException, ResourceNotFoundException {
    this.checkIfProductExists(updates.getSku());

    this.helpers.update(
      updates.getId(),
      this.repository,
      (Product product) -> this.mergeWithUpdates(product, updates)
    );
  }

  public void archiveProductById(Long id) throws ResourceNotFoundException {
    this.helpers.archiveById(id, this.repository);
  }

  public void restoreProductById(Long id) throws ResourceNotFoundException {
    this.helpers.restoreById(id, this.repository);
  }

  public void moveProductsToDefaultCategory(Category currentCategory, Category defaultCategory) {
    final List<Product> products = this.repository.findAllByCategory(currentCategory);

    for (Product product : products) {
      product.setCategory(defaultCategory);

      this.repository.save(product);
    }
  }

  private void checkIfProductExists(String sku) throws AlreadyExistException {
    if (sku != null && this.isProductExist(sku)) {
      throw new AlreadyExistException(ProductsConstants.UNIQUE_FIELD, ProductsConstants.ALREADY_EXIST_MESSAGE);
    }
  }

  private ClientProduct convertToClientProduct(Product product) {
    return (ClientProduct) this.context.getBean("clientProduct", product);
  }

  private Product convertToProduct(ClientProduct product) {
    return (Product) this.context.getBean("product", product);
  }

  private PageResponse<ClientProduct> convertToPageResponse(Page<Product> page, List<Product> products) {
    final List<ClientProduct> clientProducts = products
      .stream()
      .map(this::convertToClientProduct)
      .collect(Collectors.toList());

    return (PageResponse<ClientProduct>) this.context.getBean("pageResponse", page, clientProducts);
  }

  private void mergeWithUpdates(Product product, ClientProduct updates) {
    product.setSku(updates.getSku() == null ? product.getSku() : updates.getSku());
    product.setName(updates.getName() == null ? product.getName() : updates.getName());
    product.setImage(updates.getImage() == null ? product.getImage() : updates.getImage());
    product.setPrice(updates.getPrice() == null ? product.getPrice() : updates.getPrice());
    product.setStock(updates.getStock() == null ? product.getStock() : updates.getStock());
    product.setStockAlert(updates.getStockAlert() == null ? product.getStockAlert() : updates.getStockAlert());

    product.setStockPerTime(
      updates.getStockPerTime() == null ? product.getStockPerTime() : updates.getStockPerTime()
    );
    product.setIsAvailable(
      updates.getIsAvailable() == null ? product.getIsAvailable() : updates.getIsAvailable()
    );

    if (updates.getCategory() != null) {
      product.setCategory(
        Category.builder()
          .id(updates.getCategory().getId())
          .build()
      );
    }
  }

  private static Specification<Product> filter(ProductsFilter filter) {
    return new Specification<Product>() {

      @Override
      public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        final List<Predicate> predicates = new ArrayList<Predicate>();

        if (filter.getIsArchived() != null) {
          predicates.add(
            builder.equal(root.get("isArchived"), filter.getIsArchived())
          );
        }

        if (filter.getForMenu()) {
          final List<Category> categories = filter.getCategories()
            .stream()
            .map((category) -> Category.builder().id(category.getId()).build())
            .collect(Collectors.toList());

          predicates.add(
            builder.and(
              builder.equal(root.get("isArchived"), false),
              builder.equal(root.get("isAvailable"), true),
              root.get("category").in(categories)
            )
          );
        }

        return builder.and(predicates.toArray(new Predicate[0]));
      }

    };
  }

}
