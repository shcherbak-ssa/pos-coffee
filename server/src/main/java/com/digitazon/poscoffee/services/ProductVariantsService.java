package com.digitazon.poscoffee.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.stereotype.Service;

import com.digitazon.poscoffee.configs.AppConfig;
import com.digitazon.poscoffee.models.Product;
import com.digitazon.poscoffee.models.ProductVariant;
import com.digitazon.poscoffee.models.helpers.ClientProductVariant;
import com.digitazon.poscoffee.repositories.ProductVariantsRepository;
import com.digitazon.poscoffee.shared.constants.ProductVariantsConstants;
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

  public void updateVariant(ClientProductVariant updates) throws AlreadyExistException, ResourceNotFoundException {
    this.checkIfVariantExists(updates.getSku());

    final Optional<ProductVariant> foundVariant = this.repository.findById(updates.getId());

    if (foundVariant.isPresent()) {
      final ProductVariant variant = foundVariant.get();
      this.mergeWithUpdates(variant, updates);

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
      throw new AlreadyExistException(
        ProductVariantsConstants.UNIQUE_FIELD,
        ProductVariantsConstants.ALREADY_EXIST_MESSAGE
      );
    }
  }

  private void mergeWithUpdates(ProductVariant variant, ClientProductVariant updates) {
    variant.setSku(updates.getSku() == null ? variant.getSku() : updates.getSku());
    variant.setName(updates.getName() == null ? variant.getName() : updates.getName());
    variant.setPrice(updates.getPrice() == null ? variant.getPrice() : updates.getPrice());
    variant.setStock(updates.getStock() == null ? variant.getStock() : updates.getStock());

    variant.setStockPerTime(
      updates.getStockPerTime() == null ? variant.getStockPerTime() : updates.getStockPerTime()
    );
    variant.setUseProductPrice(
      updates.getUseProductPrice() == null ? variant.getUseProductPrice() : updates.getUseProductPrice()
    );
  }

  private ClientProductVariant convertToClientVariant(ProductVariant variant) {
    return (ClientProductVariant) this.context.getBean("clientProductVariant", variant);
  }

  private ProductVariant convertToProductVariant(ClientProductVariant clientVariant) {
    return (ProductVariant) this.context.getBean("productVariant", clientVariant);
  }

}
