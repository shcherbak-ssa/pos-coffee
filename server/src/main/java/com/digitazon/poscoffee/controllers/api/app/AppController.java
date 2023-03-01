package com.digitazon.poscoffee.controllers.api.app;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.digitazon.poscoffee.models.Product;
import com.digitazon.poscoffee.models.helpers.AppHome;
import com.digitazon.poscoffee.models.helpers.AppMenu;
import com.digitazon.poscoffee.models.helpers.OrdersFilter;
import com.digitazon.poscoffee.models.helpers.ProductsFilter;
import com.digitazon.poscoffee.models.helpers.UsersFilter;
import com.digitazon.poscoffee.models.helpers.client.ClientCategory;
import com.digitazon.poscoffee.models.helpers.client.ClientOrder;
import com.digitazon.poscoffee.models.helpers.client.ClientProduct;
import com.digitazon.poscoffee.models.helpers.client.ClientProductVariant;
import com.digitazon.poscoffee.models.helpers.client.ClientSettings;
import com.digitazon.poscoffee.models.helpers.client.ClientUser;
import com.digitazon.poscoffee.services.CategoriesService;
import com.digitazon.poscoffee.services.OrdersService;
import com.digitazon.poscoffee.services.ProductVariantsService;
import com.digitazon.poscoffee.services.ProductsService;
import com.digitazon.poscoffee.services.SettingsService;
import com.digitazon.poscoffee.services.StockService;
import com.digitazon.poscoffee.services.UsersService;
import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.exceptions.AlreadyExistException;
import com.digitazon.poscoffee.shared.exceptions.ProgerException;
import com.digitazon.poscoffee.shared.exceptions.ResourceNotFoundException;

@RestController
@CrossOrigin
@Validated
public class AppController {

  @Autowired
  private UsersService usersService;

  @Autowired
  private ProductsService productsService;

  @Autowired
  private CategoriesService categoriesService;

  @Autowired
  private ProductVariantsService variantsService;

  @Autowired
  private OrdersService ordersService;

  @Autowired
  private StockService stockService;

  @Autowired
  private SettingsService settingsService;

  @GetMapping(path = AppConstants.ApiEndpoint.App.APP_SETTINGS)
  @ResponseStatus(HttpStatus.OK)
  @PreAuthorize("hasAuthority('MANAGER')")
  public ClientSettings getSettings() throws ProgerException {
    return this.settingsService.getSettings();
  }

  @GetMapping(path = AppConstants.ApiEndpoint.App.APP_HOME)
  @ResponseStatus(HttpStatus.OK)
  @PreAuthorize("hasAuthority('MANAGER')")
  public AppHome getAppHome() {
    final UsersFilter usersFilter = UsersFilter.builder()
      .forApp(true)
      .build();

    final List<ClientUser> users = this.usersService.getUsers(usersFilter);

    final OrdersFilter ordersFilter = OrdersFilter.builder()
      .forApp(true)
      .build();

    final List<ClientOrder> orders = this.ordersService.getOrders(ordersFilter);

    return AppHome.builder()
      .users(users)
      .orders(orders)
      .build();
  }

  @GetMapping(path = AppConstants.ApiEndpoint.App.APP_MENU)
  @ResponseStatus(HttpStatus.OK)
  @PreAuthorize("hasAuthority('MANAGER')")
  public AppMenu getAppMenu() {
    List<ClientCategory> categories = this.categoriesService.getCategories(true);
    this.productsService.countProductsByCategories(categories);

    categories = categories
      .stream()
      .filter((category) -> category.getProductsCount() != AppConstants.ZERO)
      .collect(Collectors.toList());

    final ProductsFilter filter = ProductsFilter.builder()
      .forMenu(true)
      .categories(categories)
      .build();

    final List<ClientProduct> products = this.productsService.getProducts(filter);

    for (ClientProduct clientProduct : products) {
      final Product product = Product.builder()
        .id(clientProduct.getId())
        .build();

      final List<ClientProductVariant> variants = this.variantsService.getVariants(product);

      clientProduct.setVariants(variants);
    }

    return AppMenu.builder()
      .categories(categories)
      .products(products)
      .build();
  }

  @PostMapping(path = AppConstants.ApiEndpoint.App.APP_ORDERS)
  @ResponseStatus(HttpStatus.CREATED)
  @PreAuthorize("hasAuthority('MANAGER')")
  public ClientOrder createOrder(
    @RequestBody @Validated ClientOrder orderToCreate
  ) throws AlreadyExistException, ResourceNotFoundException {
    final ClientOrder createdOrder = this.ordersService.createOrder(orderToCreate);
    this.stockService.takeStock(createdOrder.getLines());

    return createdOrder;
  }

}
