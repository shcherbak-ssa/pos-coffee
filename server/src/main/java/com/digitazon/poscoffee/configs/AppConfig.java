package com.digitazon.poscoffee.configs;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.Scope;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.digitazon.poscoffee.models.Category;
import com.digitazon.poscoffee.models.Order;
import com.digitazon.poscoffee.models.OrderLine;
import com.digitazon.poscoffee.models.Product;
import com.digitazon.poscoffee.models.ProductVariant;
import com.digitazon.poscoffee.models.User;
import com.digitazon.poscoffee.models.UserType;
import com.digitazon.poscoffee.models.helpers.ErrorResponse;
import com.digitazon.poscoffee.models.helpers.client.ClientCategory;
import com.digitazon.poscoffee.models.helpers.client.ClientOrder;
import com.digitazon.poscoffee.models.helpers.client.ClientOrderLine;
import com.digitazon.poscoffee.models.helpers.client.ClientOrderUser;
import com.digitazon.poscoffee.models.helpers.client.ClientProduct;
import com.digitazon.poscoffee.models.helpers.client.ClientProductCategory;
import com.digitazon.poscoffee.models.helpers.client.ClientProductVariant;
import com.digitazon.poscoffee.models.helpers.client.ClientUser;
import com.digitazon.poscoffee.models.helpers.config.ConfigCategory;
import com.digitazon.poscoffee.models.helpers.config.ConfigOrder;
import com.digitazon.poscoffee.models.helpers.config.ConfigOrderLine;
import com.digitazon.poscoffee.models.helpers.config.ConfigProduct;
import com.digitazon.poscoffee.models.helpers.config.ConfigProductVariant;
import com.digitazon.poscoffee.models.helpers.config.ConfigUser;
import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.constants.OrdersConstants;
import com.digitazon.poscoffee.shared.helpers.Helpers;
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
  public ServiceHelpers serviceHelpers(String entityName) {
    return new ServiceHelpers(entityName);
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
      .stockPerTime(product.getStockPerTime())
      .stockAlert(product.getStockAlert())
      .image(product.getImage())
      .category(clientCategory)
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
      .createdAt(category.getCreatedAt())
      .updatedAt(category.getUpdatedAt())
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
      .stockAlert(variant.getStockAlert())
      .createdAt(variant.getCreatedAt())
      .updatedAt(variant.getUpdatedAt())
      .build();
  }

  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
  public ClientOrder clientOrder(Order order) {
    final Long orderId = order.getId();
    final String number = (orderId + OrdersConstants.ORDER_NUMBER_BASE) + AppConstants.EMPTY_STRING;
    final Float total = Helpers.calculateTotal(order);

    final User user = order.getUser();
    final ClientOrderUser clientOrderUser = ClientOrderUser.builder()
      .id(user.getId())
      .name(user.getName())
      .surname(user.getSurname())
      .build();

    final List<ClientOrderLine> lines = order.getLines()
      .stream()
      .map(this::clientOrderLine)
      .collect(Collectors.toList());

    return ClientOrder.builder()
      .id(orderId)
      .number(number)
      .total(total)
      .lines(lines)
      .user(clientOrderUser)
      .createdAt(order.getCreatedAt())
      .paymentMethod(order.getPaymentMethod().getName().name())
      .build();
  }

  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
  public ClientOrderLine clientOrderLine(OrderLine line) {
    final Product product = line.getProduct();

    final ClientOrderLine clientLine = ClientOrderLine.builder()
      .id(line.getId())
      .count(line.getCount())
      .price(line.getPrice())
      .productId(product.getId())
      .productName(product.getName())
      .image(product.getImage())
      .build();

    final ProductVariant variant = line.getVariant();

    if (variant != null) {
      clientLine.setVariantId(variant.getId());
      clientLine.setVariantName(variant.getName());
    }

    return clientLine;
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
      .stockPerTime(clientProduct.getStockPerTime())
      .stockAlert(clientProduct.getStockAlert())
      .image(clientProduct.getImage())
      .category(category)
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
      .stockAlert(clientVariant.getStockAlert())
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
      .category(category)
      .image(configProduct.getImage())
      .stock(configProduct.getStock())
      .stockPerTime(configProduct.getStockPerTime())
      .stockAlert(configProduct.getStockAlert())
      .isAvailable(configProduct.getIsAvailable())
      .isArchived(isArchived)
      .archivedAt(isArchived ? new Date() : null)
      .build();
  }

  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
  public Category categoryFromConfigCategory(ConfigCategory configCategory) {
    return Category.builder()
      .name(configCategory.getName())
      .isAvailable(configCategory.getIsAvailable())
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
      .stockAlert(variant.getStockAlert())
      .product(product)
      .build();
  }

  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
  public Order orderFromConfigOrder(ConfigOrder order, List<OrderLine> lines, User user) {
    return Order.builder()
      .lines(lines)
      .user(user)
      .build();
  }

  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
  public OrderLine orderLineFromConfigOrderLine(ConfigOrderLine line, Product product, ProductVariant variant) {
    final float price = Helpers.getOrderLinePrice(product, variant);

    return OrderLine.builder()
      .count(line.getCount())
      .price(price)
      .product(product)
      .variant(variant)
      .build();
  }

}
