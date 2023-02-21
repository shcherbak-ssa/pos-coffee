package com.digitazon.poscoffee.shared.helpers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.stereotype.Component;

import com.digitazon.poscoffee.configs.AppConfig;
import com.digitazon.poscoffee.models.Address;
import com.digitazon.poscoffee.models.Category;
import com.digitazon.poscoffee.models.Product;
import com.digitazon.poscoffee.models.ProductVariant;
import com.digitazon.poscoffee.models.User;
import com.digitazon.poscoffee.models.UserType;
import com.digitazon.poscoffee.models.helpers.Config;
import com.digitazon.poscoffee.models.helpers.ConfigCategory;
import com.digitazon.poscoffee.models.helpers.ConfigProduct;
import com.digitazon.poscoffee.models.helpers.ConfigProductVariant;
import com.digitazon.poscoffee.models.helpers.ConfigUser;
import com.digitazon.poscoffee.services.AddressService;
import com.digitazon.poscoffee.services.CategoriesService;
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

  public void loadConstants() {
    this.userTypesService.loadTypes();
  }

  public void loadConfigData(Config config) throws ProgerException, AlreadyExistException {
    this.loadUsers(config.getUsers());

    final List<Category> categories = this.loadCategories(config.getCategories());
    final List<Product> products = this.loadProducts(config.getProducts(), categories);
    this.loadProductVariants(config.getProductVariants(), products);
  }

  private void loadUsers(List<ConfigUser> users) throws ProgerException, AlreadyExistException {
    for (ConfigUser configUser : users) {
      final User user = (User) this.context.getBean("userFromConfigUser", configUser);

      final UserType userType = Helpers.converUserTypeToEnumValue(this.userTypesService, configUser.getType());
      user.setType(userType);

      final Address address = this.addressService.createAddress(configUser.getAddress());
      user.setAddress(address);

      this.usersService.createUser(user);
    }
  }

  private List<Category> loadCategories(List<ConfigCategory> categories) throws AlreadyExistException {
    final List<Category> createdCategories = new ArrayList<Category>();

    for (ConfigCategory configCategory : categories) {
      final Category category = (Category) this.context.getBean("categoryFromConfigCategory", configCategory);
      final Category createdCategory = this.categoriesService.createCategory(category);

      createdCategories.add(createdCategory);
    }

    return createdCategories;
  }

  private List<Product> loadProducts(
    List<ConfigProduct> products,
    List<Category> categories
  ) throws AlreadyExistException {
    final List<Product> createdProducts = new ArrayList<Product>();

    for (ConfigProduct configProduct : products) {
      final Category productCategory = categories
        .stream()
        .filter((category) -> category.getId() == configProduct.getCategory())
        .findFirst()
        .orElse(categories.get(0));

      final Product product = (Product)
        this.context.getBean("productFromConfigProduct", configProduct, productCategory);

      final Product createdProduct = this.productsService.createProduct(product);
      createdProducts.add(createdProduct);
    }

    return createdProducts;
  }

  private void loadProductVariants(
    List<ConfigProductVariant> variants,
    List<Product> products
  ) throws AlreadyExistException {
    for (ConfigProductVariant configVariant : variants) {
      final Product product = products
        .stream()
        .filter((variant) -> variant.getId() == configVariant.getProduct())
        .findFirst()
        .orElse(products.get(0));

      final ProductVariant productVariant = (ProductVariant)
        this.context.getBean("variantFromConfigVariant", configVariant, product);

      this.productVariantsService.createVariant(productVariant);
    }
  }

}
