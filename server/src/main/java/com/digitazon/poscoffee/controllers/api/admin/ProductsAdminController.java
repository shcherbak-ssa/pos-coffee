package com.digitazon.poscoffee.controllers.api.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.digitazon.poscoffee.models.helpers.ClientProduct;
import com.digitazon.poscoffee.models.helpers.ProductsFilter;
import com.digitazon.poscoffee.services.ProductsService;
import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.exceptions.AlreadyExistException;
import com.digitazon.poscoffee.shared.exceptions.ResourceNotFoundException;

@RestController
@CrossOrigin
@Validated
public class ProductsAdminController {

  @Autowired
  private ProductsService service;

  @GetMapping(path = AppConstants.ApiEndpoint.Admin.PRODUCTS)
  @ResponseStatus(HttpStatus.OK)
  @PreAuthorize("hasAuthority('ADMIN')")
  public List<ClientProduct> getProducts(ProductsFilter filter) {
    return this.service.getProducts(filter);
  }

  @GetMapping(path = AppConstants.ApiEndpoint.Admin.PRODUCTS_ID)
  @ResponseStatus(HttpStatus.OK)
  @PreAuthorize("hasAuthority('ADMIN')")
  public ClientProduct getProductById(@PathVariable Long id) throws ResourceNotFoundException {
    return this.service.findProductById(id);
  }

  @PostMapping(path = AppConstants.ApiEndpoint.Admin.PRODUCTS)
  @ResponseStatus(HttpStatus.CREATED)
  @PreAuthorize("hasAuthority('ADMIN')")
  public ClientProduct createProduct(
    @RequestBody @Validated(AppConstants.ValidationGroups.ToCreate.class) ClientProduct userToCreate
  ) throws AlreadyExistException {
    return this.service.createProduct(userToCreate);
  }

  @PutMapping(path = AppConstants.ApiEndpoint.Admin.PRODUCTS)
  @ResponseStatus(HttpStatus.NO_CONTENT)
  @PreAuthorize("hasAuthority('ADMIN')")
  public void updateProduct(
    @RequestBody @Validated(AppConstants.ValidationGroups.ToUpdate.class) ClientProduct updates
  ) throws ResourceNotFoundException {
    this.service.updateProduct(updates);
  }

  @PutMapping(path = AppConstants.ApiEndpoint.Admin.PRODUCTS_ARCHIVE)
  @ResponseStatus(HttpStatus.NO_CONTENT)
  @PreAuthorize("hasAuthority('ADMIN')")
  public void archiveProduct(@PathVariable Long id) throws ResourceNotFoundException {
    this.service.archiveProductById(id);
  }

  @PutMapping(path = AppConstants.ApiEndpoint.Admin.PRODUCTS_RESTORE)
  @ResponseStatus(HttpStatus.NO_CONTENT)
  @PreAuthorize("hasAuthority('ADMIN')")
  public void restoreProduct(@PathVariable Long id) throws ResourceNotFoundException {
    this.service.restoreProductById(id);
  }

}
