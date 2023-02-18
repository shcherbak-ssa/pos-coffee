package com.digitazon.poscoffee.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.digitazon.poscoffee.configs.AppConfig;
import com.digitazon.poscoffee.models.Product;
import com.digitazon.poscoffee.models.helpers.ClientProduct;
import com.digitazon.poscoffee.models.helpers.ProductsFilter;
import com.digitazon.poscoffee.repositories.ProductsRepository;
import com.digitazon.poscoffee.shared.constants.ProductsConstants;
import com.digitazon.poscoffee.shared.exceptions.AlreadyExistException;
import com.digitazon.poscoffee.shared.exceptions.ResourceNotFoundException;

@Service
public class ProductsService {

  // @TODO: conver to annotation
  private AnnotationConfigApplicationContext context
    = new AnnotationConfigApplicationContext(AppConfig.class);

  @Autowired
  private ProductsRepository repository;

  public boolean isProductExist(String sku) {
    return this.repository.existsBySku(sku);
  }

  public ClientProduct findProductById(Long id) throws ResourceNotFoundException {
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

  public ClientProduct createProduct(ClientProduct productToCreate) throws AlreadyExistException {
    final Product product = this.convertToProduct(productToCreate);
    final Product createdProduct = this.createProduct(product);

    return this.convertToClientProduct(createdProduct);
  }

  public Product createProduct(Product productToCreate) throws AlreadyExistException {
    if (this.isProductExist(productToCreate.getSku())) {
      throw new AlreadyExistException(ProductsConstants.UNIQUE_FIELD, ProductsConstants.ALREADY_EXIST_MESSAGE);
    }

    return this.repository.save(productToCreate);
  }

  public void updateProduct(ClientProduct updates) throws ResourceNotFoundException {
    final Optional<Product> foundProduct = this.repository.findById(updates.getId());

    if (foundProduct.isPresent()) {
      final Product user = foundProduct.get();
      this.mergeWithUpdates(user, updates);

      this.repository.save(user);

      return;
    }

    throw new ResourceNotFoundException("Product not found");
  }

  public void archiveProductById(Long id) throws ResourceNotFoundException {
    final Optional<Product> foundProduct = this.repository.findById(id);

    if (foundProduct.isPresent()) {
      final Product product = foundProduct.get();
      product.setIsArchived(true);
      product.setArchivedAt(new Date());

      this.repository.save(product);

      return;
    }

    throw new ResourceNotFoundException("Product not found");
  }

  public void restoreProductById(Long id) throws ResourceNotFoundException {
    final Optional<Product> foundProduct = this.repository.findById(id);

    if (foundProduct.isPresent()) {
      final Product product = foundProduct.get();

      if (!product.getIsArchived()) {
        return;
      }

      product.setIsArchived(false);
      product.setArchivedAt(null);

      this.repository.save(product);

      return;
    }

    throw new ResourceNotFoundException("Product not found");
  }

  private ClientProduct convertToClientProduct(Product product) {
    return (ClientProduct) this.context.getBean("clientProduct", product);
  }

  private Product convertToProduct(ClientProduct product) {
    return (Product) this.context.getBean("product", product);
  }

  private void mergeWithUpdates(Product product, ClientProduct updates) {
    product.setSku(updates.getSku() == null ? product.getSku() : updates.getSku());
    product.setName(updates.getName() == null ? product.getName() : updates.getName());
    product.setPrice(updates.getPrice() == null ? product.getPrice() : updates.getPrice());
    product.setPhoto(updates.getPhoto() == null ? product.getPhoto() : updates.getPhoto());
  }

  private static Specification<Product> filter(ProductsFilter filter) {
    return new Specification<Product>() {

      @Override
      public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        final Path<Product> isArchivedPath = root.get("isArchived");
        final Boolean onlyArchived = filter.getOnlyArchived();

        if (onlyArchived != null && onlyArchived) {
          return builder.equal(isArchivedPath, true);
        }

        return builder.or(
          builder.isNull(isArchivedPath),
          builder.equal(isArchivedPath, false)
        );
      }

    };
  }

}
