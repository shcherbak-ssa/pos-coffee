package com.digitazon.poscoffee.services;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.stereotype.Service;

import com.digitazon.poscoffee.configs.AppConfig;
import com.digitazon.poscoffee.models.Product;
import com.digitazon.poscoffee.models.ProductVariant;
import com.digitazon.poscoffee.models.helpers.client.ClientProductVariant;
import com.digitazon.poscoffee.models.helpers.filters.ProductsFilter;
import com.digitazon.poscoffee.repositories.ProductVariantsRepository;
import com.digitazon.poscoffee.shared.constants.ProductsConstants;
import com.digitazon.poscoffee.shared.exceptions.AlreadyExistException;
import com.digitazon.poscoffee.shared.exceptions.ResourceNotFoundException;

@Service
public class ProductVariantsService {

  // @TODO: conver to annotation
  private AnnotationConfigApplicationContext context
    = new AnnotationConfigApplicationContext(AppConfig.class);

  @Autowired
  private ProductVariantsRepository repository;

  public boolean isVariantExist(String sku) {
    return this.repository.existsBySku(sku);
  }

  public ProductVariant findVariantById(Long id) throws ResourceNotFoundException {
    final Optional<ProductVariant> foundVariant = this.repository.findById(id);

    if (foundVariant.isPresent()) {
      return foundVariant.get();
    }

    throw new ResourceNotFoundException("Variant not found");
  }

  public List<ClientProductVariant> getVariants(Product product) {
    final List<ProductVariant> variants = this.repository.findAllByProduct(product);

    return variants
      .stream()
      .map(this::convertToClientVariant)
      .collect(Collectors.toList());
  }

  public ClientProductVariant createVariant(
    ClientProductVariant variantToCreate, Product product
  ) throws AlreadyExistException {
    final ProductVariant productVariant = this.convertToProductVariant(variantToCreate);
    productVariant.setProduct(product);

    final ProductVariant createdProductVariant = this.createVariant(productVariant);

    return this.convertToClientVariant(createdProductVariant);
  }

  public ProductVariant createVariant(ProductVariant variantToCreate) throws AlreadyExistException {
    this.checkIfVariantExists(variantToCreate.getSku());

    return this.repository.save(variantToCreate);
  }

  public void updateVariant(
    ClientProductVariant updates, ProductsFilter filter
  ) throws AlreadyExistException, ResourceNotFoundException {
    this.checkIfVariantExists(updates.getSku());

    final Optional<ProductVariant> foundVariant = this.repository.findById(updates.getId());

    if (foundVariant.isPresent()) {
      final ProductVariant variant = foundVariant.get();
      this.mergeWithUpdates(variant, updates, filter);

      this.repository.save(variant);

      return;
    }

    throw new ResourceNotFoundException("Product variant not found");
  }

  public void deleteVariant(Long id) {
    this.repository.deleteById(id);
  }

  private void checkIfVariantExists(String sku) throws AlreadyExistException {
    if (sku != null && this.isVariantExist(sku)) {
      throw new AlreadyExistException(ProductsConstants.UNIQUE_FIELD, ProductsConstants.ALREADY_EXIST_MESSAGE);
    }
  }

  private void mergeWithUpdates(ProductVariant variant, ClientProductVariant updates, ProductsFilter filter) {
    variant.setSku(updates.getSku() == null ? variant.getSku() : updates.getSku());
    variant.setName(updates.getName() == null ? variant.getName() : updates.getName());

    if (filter.getNullLabels() != null) {
      final List<String> nullLabels = Arrays.asList(filter.getNullLabels());

      if (nullLabels.contains(ProductsConstants.STOCK_LABEL)) {
        variant.setStock(updates.getStock());
      }

      if (nullLabels.contains(ProductsConstants.STOCK_PER_TIME_LABEL)) {
        variant.setStockPerTime(updates.getStockPerTime());
      }

      if (nullLabels.contains(ProductsConstants.STOCK_ALERT_LABEL)) {
        variant.setStockAlert(updates.getStockAlert());
      }
    }
  }

  private ClientProductVariant convertToClientVariant(ProductVariant variant) {
    return (ClientProductVariant) this.context.getBean("clientProductVariant", variant);
  }

  private ProductVariant convertToProductVariant(ClientProductVariant clientVariant) {
    return (ProductVariant) this.context.getBean("productVariant", clientVariant);
  }

}
