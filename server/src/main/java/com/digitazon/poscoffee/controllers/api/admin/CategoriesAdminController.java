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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.digitazon.poscoffee.models.Category;
import com.digitazon.poscoffee.models.helpers.ClientCategory;
import com.digitazon.poscoffee.models.helpers.EntityFilter;
import com.digitazon.poscoffee.services.CategoriesService;
import com.digitazon.poscoffee.services.ProductsService;
import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.constants.CategoriesConstants;
import com.digitazon.poscoffee.shared.exceptions.AlreadyExistException;
import com.digitazon.poscoffee.shared.exceptions.ResourceNotFoundException;

@RestController
@CrossOrigin
@Validated
public class CategoriesAdminController {

  @Autowired
  private CategoriesService service;

  @Autowired
  private ProductsService productsService;

  @GetMapping(path = AppConstants.ApiEndpoint.Admin.CATEGORIES)
  @ResponseStatus(HttpStatus.OK)
  @PreAuthorize("hasAuthority('ADMIN')")
  public List<ClientCategory> getCategories(@RequestParam(AppConstants.PARAM_ONLY_ARCHIVED) boolean onlyArchived) {
    final EntityFilter filter = EntityFilter.builder()
      .onlyArchived(onlyArchived)
      .build();

    final List<ClientCategory> categories = this.service.getCategories(filter);
    this.productsService.countProductsByCategories(categories);

    return categories;
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
  ) throws AlreadyExistException, ResourceNotFoundException {
    this.service.updateCategory(updates);
  }

  @PutMapping(path = AppConstants.ApiEndpoint.Admin.CATEGORIES_ARCHIVE)
  @ResponseStatus(HttpStatus.NO_CONTENT)
  @PreAuthorize("hasAuthority('ADMIN')")
  public void archiveCategory(@PathVariable Long id) throws ResourceNotFoundException {
    this.service.archiveCategoryById(id);

    final Category currentCategory = this.createCategoryById(id);
    final Category defaultCategory = this.createCategoryById(CategoriesConstants.DEFAULT_CATEGORY_ID);

    this.productsService.moveProductsToDefaultCategory(currentCategory, defaultCategory);
  }

  @PutMapping(path = AppConstants.ApiEndpoint.Admin.CATEGORIES_RESTORE)
  @ResponseStatus(HttpStatus.NO_CONTENT)
  @PreAuthorize("hasAuthority('ADMIN')")
  public void restoreCategory(@PathVariable Long id) throws ResourceNotFoundException {
    this.service.restoreCategoryById(id);
  }

  private Category createCategoryById(Long id) {
    return Category.builder()
      .id(id)
      .build();
  }

}
