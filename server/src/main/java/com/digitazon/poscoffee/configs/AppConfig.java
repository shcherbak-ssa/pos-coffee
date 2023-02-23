package com.digitazon.poscoffee.configs;

import java.util.Date;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.Scope;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.digitazon.poscoffee.models.Category;
import com.digitazon.poscoffee.models.Product;
import com.digitazon.poscoffee.models.ProductVariant;
import com.digitazon.poscoffee.models.User;
import com.digitazon.poscoffee.models.UserType;
import com.digitazon.poscoffee.models.base.BaseEntity;
import com.digitazon.poscoffee.models.helpers.ClientCategory;
import com.digitazon.poscoffee.models.helpers.ClientProduct;
import com.digitazon.poscoffee.models.helpers.ClientProductCategory;
import com.digitazon.poscoffee.models.helpers.ClientProductVariant;
import com.digitazon.poscoffee.models.helpers.ClientUser;
import com.digitazon.poscoffee.models.helpers.ConfigCategory;
import com.digitazon.poscoffee.models.helpers.ConfigProduct;
import com.digitazon.poscoffee.models.helpers.ConfigProductVariant;
import com.digitazon.poscoffee.models.helpers.ConfigUser;
import com.digitazon.poscoffee.models.helpers.ErrorResponse;
import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.helpers.ServiceHelpers;

@Configuration
@PropertySource(AppConstants.POSCOFFEE_PROPS_FILENAME)
public class AppConfig {

  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
  public ErrorResponse errorResponse() {
    return new ErrorResponse();
  }

  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON)
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
  public <T extends BaseEntity> ServiceHelpers<T> serviceHelpers(
    JpaRepository<T, Long> repository, String entityName
  ) {
    return new ServiceHelpers<T>(repository, entityName);
  }

  /**
   * Entity to Client
   */

  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
  public ClientUser clientUser(User user, boolean loadAddress) {
    return ClientUser.builder()
      .id(user.getId())
      .name(user.getName())
      .surname(user.getSurname())
      .email(user.getEmail())
      .phone(user.getPhone())
      .type(user.getType().getName().name())
      .image(user.getImage())
      .address(loadAddress ? user.getAddress() : null)
      .isArchived(user.getIsArchived())
      .createdAt(user.getCreatedAt())
      .updatedAt(user.getUpdatedAt())
      .archivedAt(user.getArchivedAt())
      .build();
  }

  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
  public ClientProduct clientProduct(Product product) {
    final Category category = product.getCategory();
    final ClientProductCategory clientCategory = ClientProductCategory.builder()
      .id(category.getId())
      .name(category.getName())
      .build();

    return ClientProduct.builder()
      .id(product.getId())
      .sku(product.getSku())
      .name(product.getName())
      .price(product.getPrice())
      .stock(product.getStock())
      .image(product.getImage())
      .category(clientCategory)
      .useStockForVariants(product.getUseStockForVariants())
      .isAvailable(product.getIsAvailable())
      .isArchived(product.getIsArchived())
      .createdAt(product.getCreatedAt())
      .updatedAt(product.getUpdatedAt())
      .archivedAt(product.getArchivedAt())
      .build();
  }

  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
  public ClientProductCategory clientProductCategory(Category category) {
    return ClientProductCategory.builder()
      .id(category.getId())
      .name(category.getName())
      .build();
  }

  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
  public ClientCategory clientCategory(Category category) {
    return ClientCategory.builder()
      .id(category.getId())
      .name(category.getName())
      .isAvailable(category.getIsAvailable())
      .isArchived(category.getIsArchived())
      .createdAt(category.getCreatedAt())
      .updatedAt(category.getUpdatedAt())
      .archivedAt(category.getArchivedAt())
      .build();
  }

  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
  public ClientProductVariant clientProductVariant(ProductVariant variant) {
    return ClientProductVariant.builder()
      .id(variant.getId())
      .sku(variant.getSku())
      .name(variant.getName())
      .price(variant.getPrice())
      .stock(variant.getStock())
      .stockPerTime(variant.getStockPerTime())
      .useProductPrice(variant.getUseProductPrice())
      .build();
  }

  /**
   * Client to Entity
   */

  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
  public User user(ClientUser clientUser, UserType userType) {
    return User.builder()
      .id(clientUser.getId())
      .name(clientUser.getName())
      .surname(clientUser.getSurname())
      .email(clientUser.getEmail())
      .phone(clientUser.getPhone())
      .image(clientUser.getImage())
      .address(clientUser.getAddress())
      .type(userType)
      .build();
  }

  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
  public Product product(ClientProduct clientProduct) {
    final Category category = Category.builder()
      .id(clientProduct.getCategory().getId())
      .build();

    return Product.builder()
      .id(clientProduct.getId())
      .sku(clientProduct.getSku())
      .name(clientProduct.getName())
      .price(clientProduct.getPrice())
      .stock(clientProduct.getStock())
      .image(clientProduct.getImage())
      .category(category)
      .useStockForVariants(clientProduct.getUseStockForVariants())
      .isAvailable(clientProduct.getIsAvailable())
      .build();
  }

  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
  public Category category(ClientCategory clientCategory) {
    return Category.builder()
      .id(clientCategory.getId())
      .name(clientCategory.getName())
      .isAvailable(clientCategory.getIsAvailable())
      .build();
  }

  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
  public ProductVariant productVariant(ClientProductVariant clientVariant) {
    return ProductVariant.builder()
      .id(clientVariant.getId())
      .sku(clientVariant.getSku())
      .name(clientVariant.getName())
      .price(clientVariant.getPrice())
      .stock(clientVariant.getStock())
      .stockPerTime(clientVariant.getStockPerTime())
      .useProductPrice(clientVariant.getUseProductPrice())
      .build();
  }

  /**
   * Config to Model
   */

  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
  public User userFromConfigUser(ConfigUser configUser) {
    final boolean isArchived = configUser.getIsArchived();

    return User.builder()
      .name(configUser.getName())
      .surname(configUser.getSurname())
      .email(configUser.getEmail())
      .phone(configUser.getPhone())
      .password(configUser.getPassword())
      .image(configUser.getImage())
      .isArchived(isArchived)
      .archivedAt(isArchived ? new Date() : null)
      .build();
  }

  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
  public Product productFromConfigProduct(ConfigProduct configProduct, Category category) {
    final boolean isArchived = configProduct.getIsArchived();

    return Product.builder()
      .sku(configProduct.getSku())
      .name(configProduct.getName())
      .price(configProduct.getPrice())
      .stock(configProduct.getStock())
      .category(category)
      .image(configProduct.getImage())
      .useStockForVariants(configProduct.getUseStockForVariants())
      .isAvailable(configProduct.getIsAvailable())
      .isArchived(isArchived)
      .archivedAt(isArchived ? new Date() : null)
      .build();
  }

  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
  public Category categoryFromConfigCategory(ConfigCategory configCategory) {
    final boolean isArchived = configCategory.getIsArchived();

    return Category.builder()
      .name(configCategory.getName())
      .isAvailable(configCategory.getIsAvailable())
      .isArchived(isArchived)
      .archivedAt(isArchived ? new Date() : null)
      .build();
  }

  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
  public ProductVariant variantFromConfigVariant(ConfigProductVariant variant, Product product) {
    return ProductVariant.builder()
      .sku(variant.getSku())
      .name(variant.getName())
      .price(variant.getPrice())
      .stock(variant.getStock())
      .stockPerTime(variant.getStockPerTime())
      .useProductPrice(variant.getUseProductPrice())
      .product(product)
      .build();
  }

}
