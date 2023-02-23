package com.digitazon.poscoffee.shared.helpers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
import com.digitazon.poscoffee.models.User;
import com.digitazon.poscoffee.models.UserType;
import com.digitazon.poscoffee.models.helpers.config.Config;
import com.digitazon.poscoffee.models.helpers.config.ConfigCategory;
import com.digitazon.poscoffee.models.helpers.config.ConfigOrder;
import com.digitazon.poscoffee.models.helpers.config.ConfigOrderLine;
import com.digitazon.poscoffee.models.helpers.config.ConfigProduct;
import com.digitazon.poscoffee.models.helpers.config.ConfigProductVariant;
import com.digitazon.poscoffee.models.helpers.config.ConfigUser;
import com.digitazon.poscoffee.services.AddressService;
import com.digitazon.poscoffee.services.CategoriesService;
import com.digitazon.poscoffee.services.OrdersService;
import com.digitazon.poscoffee.services.ProductVariantsService;
import com.digitazon.poscoffee.services.ProductsService;
import com.digitazon.poscoffee.services.UserTypesService;
import com.digitazon.poscoffee.services.UsersService;
import com.digitazon.poscoffee.shared.exceptions.AlreadyExistException;
import com.digitazon.poscoffee.shared.exceptions.ProgerException;

@Component
public class DatabaseDataLoader {

  // @TODO: conver to annotation
  private AnnotationConfigApplicationContext context
    = new AnnotationConfigApplicationContext(AppConfig.class);

  @Autowired
  private UsersService usersService;

  @Autowired
  private UserTypesService userTypesService;

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
  }

  public void loadConfigData(Config config) throws ProgerException, AlreadyExistException {
    final List<User> users = this.loadUsers(config.getUsers());
    final List<Category> categories = this.loadCategories(config.getCategories());
    final List<Product> products = this.loadProducts(config.getProducts(), categories);
    final List<ProductVariant> variants = this.loadProductVariants(config.getProductVariants(), products);

    this.loadOrders(
      config.getOrders(),
      config.getOrderLines(),
      variants,
      users
    );
  }

  private List<User> loadUsers(List<ConfigUser> users) throws ProgerException, AlreadyExistException {
    final List<User> createdUsers = new ArrayList<User>();

    for (ConfigUser configUser : users) {
      final User user = (User) this.context.getBean("userFromConfigUser", configUser);

      final UserType userType = Helpers.converUserTypeToEnumValue(this.userTypesService, configUser.getType());
      user.setType(userType);

      final Address address = this.addressService.createAddress(configUser.getAddress());
      user.setAddress(address);

      final User created = this.usersService.createUser(user);
      createdUsers.add(created);
    }

    return createdUsers;
  }

  private List<Category> loadCategories(List<ConfigCategory> categories) throws AlreadyExistException {
    final List<Category> createdCategories = new ArrayList<Category>();

    for (ConfigCategory configCategory : categories) {
      final Category category = (Category) this.context.getBean("categoryFromConfigCategory", configCategory);

      final Category created = this.categoriesService.createCategory(category);
      createdCategories.add(created);
    }

    return createdCategories;
  }

  private List<Product> loadProducts(
    List<ConfigProduct> products,
    List<Category> categories
  ) throws AlreadyExistException {
    final List<Product> createdProducts = new ArrayList<Product>();

    for (ConfigProduct configProduct : products) {
      final Category productCategory = Helpers.findEntityById(categories, configProduct.getCategory());

      final Product product = (Product)
        this.context.getBean("productFromConfigProduct", configProduct, productCategory);

      final Product created = this.productsService.createProduct(product);
      createdProducts.add(created);
    }

    return createdProducts;
  }

  private List<ProductVariant> loadProductVariants(
    List<ConfigProductVariant> variants,
    List<Product> products
  ) throws AlreadyExistException {
    final List<ProductVariant> createdVariants = new ArrayList<ProductVariant>();

    for (ConfigProductVariant configVariant : variants) {
      final Product product = Helpers.findEntityById(products, configVariant.getProduct());

      final ProductVariant productVariant = (ProductVariant)
        this.context.getBean("variantFromConfigVariant", configVariant, product);

      final ProductVariant created = this.productVariantsService.createVariant(productVariant);
      createdVariants.add(created);
    }

    return createdVariants;
  }

  private void loadOrders(
    List<ConfigOrder> orders,
    List<ConfigOrderLine> lines,
    List<ProductVariant> variants,
    List<User> users
  ) {
    final List<OrderLine> orderLines = this.loadOrderLines(lines, variants);

    for (ConfigOrder configOrder : orders) {
      final User user = Helpers.findEntityById(users, configOrder.getUser());

      final List<Long> lineIds = configOrder.getLines();
      final List<OrderLine> currentOrderLines = orderLines
        .stream()
        .filter((line) -> lineIds.contains(line.getId()))
        .collect(Collectors.toList());

      final Order order = (Order)
        this.context.getBean("orderFromConfigOrder", configOrder, currentOrderLines, user);

      this.ordersService.createOrder(order);
    }
  }

  private List<OrderLine> loadOrderLines(List<ConfigOrderLine> lines, List<ProductVariant> variants) {
    final List<OrderLine> createdLines = new ArrayList<OrderLine>();

    for (ConfigOrderLine configLine : lines) {
      final ProductVariant variant = Helpers.findEntityById(variants, configLine.getVariant());
      final OrderLine line = (OrderLine) this.context.getBean("orderLineFromConfigOrderLine", configLine, variant);

      final OrderLine created = this.ordersService.createOrderLine(line);
      createdLines.add(created);
    }

    return createdLines;
  }

}
