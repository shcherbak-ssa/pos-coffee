package com.digitazon.poscoffee.controllers.api.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.digitazon.poscoffee.models.helpers.ClientProductCategory;
import com.digitazon.poscoffee.services.CategoriesService;
import com.digitazon.poscoffee.shared.constants.AppConstants;

@RestController
@CrossOrigin
@Validated
public class AdminAppController {

  @Autowired
  private CategoriesService categoriesService;

  @GetMapping(path = AppConstants.ApiEndpoint.Admin.APP_PRODUCT_CATEGORIES)
  @ResponseStatus(HttpStatus.OK)
  @PreAuthorize("hasAuthority('ADMIN')")
  public List<ClientProductCategory> getProductCategories() {
    return this.categoriesService.getProductCategories();
  }

}
