package com.digitazon.poscoffee.shared.helpers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.stereotype.Component;

import com.digitazon.poscoffee.configs.AppConfig;
import com.digitazon.poscoffee.models.Address;
import com.digitazon.poscoffee.models.Category;
import com.digitazon.poscoffee.models.Order;
import com.digitazon.poscoffee.models.OrderLine;
import com.digitazon.poscoffee.models.Product;
import com.digitazon.poscoffee.models.ProductVariant;
import com.digitazon.poscoffee.models.Settings;
import com.digitazon.poscoffee.models.User;
import com.digitazon.poscoffee.models.constants.Currency;
import com.digitazon.poscoffee.models.constants.PaymentMethod;
import com.digitazon.poscoffee.models.constants.UserType;
import com.digitazon.poscoffee.models.helpers.config.Config;
import com.digitazon.poscoffee.models.helpers.config.ConfigCategory;
import com.digitazon.poscoffee.models.helpers.config.ConfigOrder;
import com.digitazon.poscoffee.models.helpers.config.ConfigOrderLine;
import com.digitazon.poscoffee.models.helpers.config.ConfigProduct;
import com.digitazon.poscoffee.models.helpers.config.ConfigProductVariant;
import com.digitazon.poscoffee.models.helpers.config.ConfigSettings;
import com.digitazon.poscoffee.models.helpers.config.ConfigUser;
import com.digitazon.poscoffee.services.AddressService;
import com.digitazon.poscoffee.services.CategoriesService;
import com.digitazon.poscoffee.services.CurrenciesService;
import com.digitazon.poscoffee.services.OrdersService;
import com.digitazon.poscoffee.services.PaymentMethodsService;
import com.digitazon.poscoffee.services.ProductVariantsService;
import com.digitazon.poscoffee.services.ProductsService;
import com.digitazon.poscoffee.services.SettingsService;
import com.digitazon.poscoffee.services.UserTypesService;
import com.digitazon.poscoffee.services.UsersService;
import com.digitazon.poscoffee.shared.exceptions.AlreadyExistException;
import com.digitazon.poscoffee.shared.exceptions.ProgerException;
import com.digitazon.poscoffee.shared.exceptions.ResourceNotFoundException;

@Component
public class DatabaseDataLoader {

  // @TODO: conver to annotation
  private AnnotationConfigApplicationContext context
    = new AnnotationConfigApplicationContext(AppConfig.class);

  @Autowired
  private UserTypesService userTypesService;

  @Autowired
  private PaymentMethodsService paymentMethodsService;

  @Autowired
  private CurrenciesService currenciesService;

  @Autowired
  private SettingsService settingsService;

  @Autowired
  private UsersService usersService;

  @Autowired
  private AddressService addressService;

  @Autowired
  private ProductsService productsService;

  @Autowired
  private CategoriesService categoriesService;

  @Autowired
  private ProductVariantsService productVariantsService;

  @Autowired
  private OrdersService ordersService;

  public void loadConstants() {
    this.userTypesService.loadTypes();
    this.paymentMethodsService.loadMethods();
    this.currenciesService.loadCurrencies();
  }

  public void loadConfigData(Config config) throws ProgerException, ResourceNotFoundException, AlreadyExistException {
    this.loadSettings(config.getSettings());
    this.loadUsers(config.getUsers());
    this.loadCategories(config.getCategories());
    this.loadProducts(config.getProducts());
    this.loadProductVariants(config.getProductVariants());
    this.loadOrderLines(config.getOrderLines());
    this.loadOrders(config.getOrders());
  }

  private void loadSettings(ConfigSettings configSettings) {
    final Settings settings = (Settings) this.context.getBean("settingsFromConfigSettings", configSettings);

    final Currency currency = this.currenciesService.getByName(configSettings.getCurrency());
    settings.setCurrency(currency);

    this.settingsService.createSettings(settings);
  }

  private void loadUsers(List<ConfigUser> users) throws AlreadyExistException {
    for (ConfigUser configUser : users) {
      final User user = (User) this.context.getBean("userFromConfigUser", configUser);

      final UserType userType = this.userTypesService.getByName(configUser.getType());
      user.setType(userType);

      final Address address = this.addressService.createAddress(configUser.getAddress());
      user.setAddress(address);

      this.usersService.createUser(user);
    }
  }

  private void loadCategories(List<ConfigCategory> categories) throws AlreadyExistException {
    for (ConfigCategory configCategory : categories) {
      final Category category = (Category) this.context.getBean("categoryFromConfigCategory", configCategory);

      this.categoriesService.createCategory(category);
    }
  }

  private void loadProducts(List<ConfigProduct> products) throws AlreadyExistException {
    for (ConfigProduct configProduct : products) {
      final Category category = Category.builder()
        .id(configProduct.getCategory())
        .build();

      final Product product = (Product)
        this.context.getBean("productFromConfigProduct", configProduct, category);

      this.productsService.createProduct(product);
    }
  }

  private void loadProductVariants(List<ConfigProductVariant> variants) throws AlreadyExistException {
    for (ConfigProductVariant configVariant : variants) {
      final Product product = Product.builder()
        .id(configVariant.getProduct())
        .build();

      final ProductVariant productVariant = (ProductVariant)
        this.context.getBean("variantFromConfigVariant", configVariant, product);

      this.productVariantsService.createVariant(productVariant);
    }
  }

  private void loadOrderLines(List<ConfigOrderLine> lines) throws ResourceNotFoundException {
    for (ConfigOrderLine configLine : lines) {
      final Product product = this.productsService.findProductById(configLine.getProduct());
      final ProductVariant variant = configLine.getVariant() == null
        ? null
        : this.productVariantsService.findVariantById(configLine.getVariant());

      final OrderLine line = (OrderLine)
        this.context.getBean("orderLineFromConfigOrderLine", configLine, product, variant);

      this.ordersService.createOrderLine(line);
    }
  }

  private void loadOrders(List<ConfigOrder> orders) throws ProgerException {
    for (ConfigOrder configOrder : orders) {
      final Order order = (Order) this.context.getBean("orderFromConfigOrder", configOrder);

      final PaymentMethod paymentMethod = this.paymentMethodsService.getByName(configOrder.getPaymentMethod());
      order.setPaymentMethod(paymentMethod);

      this.ordersService.createOrder(order);
    }
  }

}
