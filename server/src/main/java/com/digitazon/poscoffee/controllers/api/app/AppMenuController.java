package com.digitazon.poscoffee.controllers.api.app;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.digitazon.poscoffee.models.Product;
import com.digitazon.poscoffee.models.helpers.ProductFilter;
import com.digitazon.poscoffee.models.helpers.client.ClientCategory;
import com.digitazon.poscoffee.models.helpers.client.ClientProduct;
import com.digitazon.poscoffee.models.helpers.client.ClientProductVariant;
import com.digitazon.poscoffee.services.CategoriesService;
import com.digitazon.poscoffee.services.ProductVariantsService;
import com.digitazon.poscoffee.services.ProductsService;
import com.digitazon.poscoffee.shared.constants.AppConstants;

@RestController
@CrossOrigin
public class AppMenuController {

  @Autowired
  private ProductsService productsService;

  @Autowired
  private CategoriesService categoriesService;

  @Autowired
  private ProductVariantsService variantsService;

  @GetMapping(path = AppConstants.ApiEndpoint.App.MENU_CATEGORIES)
  @ResponseStatus(HttpStatus.OK)
  @PreAuthorize("hasAuthority('MANAGER')")
  public List<ClientCategory> getProductCategories() {
    final List<ClientCategory> categories = this.categoriesService.getCategories(true);
    this.productsService.countProductsByCategories(categories);

    return categories
      .stream()
      .filter((category) -> category.getProductsCount() != AppConstants.ZERO)
      .collect(Collectors.toList());
  }

  @GetMapping(path = AppConstants.ApiEndpoint.App.MENU_PRODUCTS)
  @ResponseStatus(HttpStatus.OK)
  @PreAuthorize("hasAuthority('MANAGER')")
  public List<ClientProduct> getProducts() {
    final ProductFilter filter = ProductFilter.builder()
      .isArchived(false)
      .isAvailable(true)
      .build();

    final List<ClientProduct> products = this.productsService.getProducts(filter);

    for (ClientProduct clientProduct : products) {
      final Product product = Product.builder()
        .id(clientProduct.getId())
        .build();

      final List<ClientProductVariant> variants = this.variantsService.getVariants(product);

      clientProduct.setVariants(variants);
    }

    return products;
  }

}