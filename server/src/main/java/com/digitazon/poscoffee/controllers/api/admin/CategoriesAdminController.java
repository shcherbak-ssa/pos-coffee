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

import com.digitazon.poscoffee.models.helpers.CategoriesFilter;
import com.digitazon.poscoffee.models.helpers.ClientCategory;
import com.digitazon.poscoffee.services.CategoriesService;
import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.exceptions.AlreadyExistException;
import com.digitazon.poscoffee.shared.exceptions.ResourceNotFoundException;

@RestController
@CrossOrigin
@Validated
public class CategoriesAdminController {

  @Autowired
  private CategoriesService service;

  @GetMapping(path = AppConstants.ApiEndpoint.Admin.CATEGORIES)
  @ResponseStatus(HttpStatus.OK)
  @PreAuthorize("hasAuthority('ADMIN')")
  public List<ClientCategory> getCategories(CategoriesFilter filter) {
    return this.service.getCategories(filter);
  }

  @PostMapping(path = AppConstants.ApiEndpoint.Admin.CATEGORIES)
  @ResponseStatus(HttpStatus.CREATED)
  @PreAuthorize("hasAuthority('ADMIN')")
  public ClientCategory createCategory(
    @RequestBody @Validated(AppConstants.ValidationGroups.ToCreate.class) ClientCategory categoryToCreate
  ) throws AlreadyExistException {
    return this.service.createCategory(categoryToCreate);
  }

  @PutMapping(path = AppConstants.ApiEndpoint.Admin.CATEGORIES)
  @ResponseStatus(HttpStatus.NO_CONTENT)
  @PreAuthorize("hasAuthority('ADMIN')")
  public void updateCategory(
    @RequestBody @Validated(AppConstants.ValidationGroups.ToUpdate.class) ClientCategory updates
  ) throws ResourceNotFoundException {
    this.service.updateCategory(updates);
  }

  @PutMapping(path = AppConstants.ApiEndpoint.Admin.CATEGORIES_ARCHIVE)
  @ResponseStatus(HttpStatus.NO_CONTENT)
  @PreAuthorize("hasAuthority('ADMIN')")
  public void archiveCategory(@PathVariable Long id) throws ResourceNotFoundException {
    this.service.archiveCategoryById(id);
  }

  @PutMapping(path = AppConstants.ApiEndpoint.Admin.CATEGORIES_RESTORE)
  @ResponseStatus(HttpStatus.NO_CONTENT)
  @PreAuthorize("hasAuthority('ADMIN')")
  public void restoreCategory(@PathVariable Long id) throws ResourceNotFoundException {
    this.service.restoreCategoryById(id);
  }

}
