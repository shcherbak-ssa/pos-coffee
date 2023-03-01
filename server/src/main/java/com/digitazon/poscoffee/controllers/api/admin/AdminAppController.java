package com.digitazon.poscoffee.controllers.api.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.digitazon.poscoffee.models.helpers.client.ClientProductCategory;
import com.digitazon.poscoffee.models.helpers.client.ClientSettings;
import com.digitazon.poscoffee.services.CategoriesService;
import com.digitazon.poscoffee.services.SettingsService;
import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.exceptions.ProgerException;
import com.digitazon.poscoffee.shared.exceptions.ResourceNotFoundException;

@RestController
@CrossOrigin
@Validated
public class AdminAppController {

  @Autowired
  private CategoriesService categoriesService;

  @Autowired
  private SettingsService settingsService;

  @GetMapping(path = AppConstants.ApiEndpoint.Admin.APP_SETTINGS)
  @ResponseStatus(HttpStatus.OK)
  @PreAuthorize("hasAuthority('ADMIN')")
  public ClientSettings getSettings() throws ProgerException {
    return this.settingsService.getSettings();
  }

  @PutMapping(path = AppConstants.ApiEndpoint.Admin.APP_SETTINGS)
  @ResponseStatus(HttpStatus.NO_CONTENT)
  @PreAuthorize("hasAuthority('ADMIN')")
  public void updateCategory(@RequestBody @Validated ClientSettings updates) throws ResourceNotFoundException {
    this.settingsService.updateSettings(updates);
  }

  @GetMapping(path = AppConstants.ApiEndpoint.Admin.APP_PRODUCT_CATEGORIES)
  @ResponseStatus(HttpStatus.OK)
  @PreAuthorize("hasAuthority('ADMIN')")
  public List<ClientProductCategory> getProductCategories() {
    return this.categoriesService.getProductCategories();
  }

}
