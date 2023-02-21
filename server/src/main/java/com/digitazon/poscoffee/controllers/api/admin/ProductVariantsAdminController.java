package com.digitazon.poscoffee.controllers.api.admin;

import java.util.List;

import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.digitazon.poscoffee.models.Product;
import com.digitazon.poscoffee.models.helpers.ClientProductVariant;
import com.digitazon.poscoffee.services.ProductVariantsService;
import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.constants.ProductVariantsConstants;
import com.digitazon.poscoffee.shared.exceptions.AlreadyExistException;
import com.digitazon.poscoffee.shared.exceptions.ResourceNotFoundException;

@RestController
@CrossOrigin
@Validated
public class ProductVariantsAdminController {

  @Autowired
  private ProductVariantsService service;

  @GetMapping(path = AppConstants.ApiEndpoint.Admin.PRODUCT_VARIANTS)
  @ResponseStatus(HttpStatus.OK)
  @PreAuthorize("hasAuthority('ADMIN')")
  public List<ClientProductVariant> getVariants(
    @RequestParam(ProductVariantsConstants.PARAM_PRODUCT_ID)
    @NotNull(message = ProductVariantsConstants.PARAM_PRODUCT_ID_MESSAGE)
    Long productId
  ) {
    final Product product = this.createProductById(productId);

    return this.service.getVariants(product);
  }

  @PostMapping(path = AppConstants.ApiEndpoint.Admin.PRODUCT_VARIANTS)
  @ResponseStatus(HttpStatus.CREATED)
  @PreAuthorize("hasAuthority('ADMIN')")
  public ClientProductVariant createVariant(
    @RequestParam(ProductVariantsConstants.PARAM_PRODUCT_ID)
    @NotNull(message = ProductVariantsConstants.PARAM_PRODUCT_ID_MESSAGE)
      Long productId,
    @RequestBody @Validated(AppConstants.ValidationGroups.ToCreate.class)
      ClientProductVariant variantToCreate
  ) throws AlreadyExistException {
    final Product product = this.createProductById(productId);

    return this.service.createVariant(variantToCreate, product);
  }

  @PutMapping(path = AppConstants.ApiEndpoint.Admin.PRODUCT_VARIANTS)
  @ResponseStatus(HttpStatus.NO_CONTENT)
  @PreAuthorize("hasAuthority('ADMIN')")
  public void updateProduct(
    @RequestBody @Validated(AppConstants.ValidationGroups.ToUpdate.class) ClientProductVariant updates
  ) throws AlreadyExistException, ResourceNotFoundException {
    this.service.updateVariant(updates);
  }

  @DeleteMapping(path = AppConstants.ApiEndpoint.Admin.PRODUCT_VARIANTS_ID)
  @ResponseStatus(HttpStatus.NO_CONTENT)
  @PreAuthorize("hasAuthority('ADMIN')")
  public void deleteVariant(@PathVariable Long id) {
    this.service.deleteVariant(id);
  }

  private Product createProductById(Long id) {
    return Product.builder()
      .id(id)
      .build();
  }

}
