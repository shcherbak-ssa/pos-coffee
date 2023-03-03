package com.digitazon.poscoffee.controllers.api.admin;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.digitazon.poscoffee.models.helpers.SearchAdminResult;
import com.digitazon.poscoffee.models.helpers.SearchProductsResult;
import com.digitazon.poscoffee.models.helpers.client.ClientCategory;
import com.digitazon.poscoffee.models.helpers.client.ClientProductCategory;
import com.digitazon.poscoffee.models.helpers.client.ClientSettings;
import com.digitazon.poscoffee.models.helpers.client.ClientUser;
import com.digitazon.poscoffee.models.helpers.statistics.Statistics;
import com.digitazon.poscoffee.services.CategoriesService;
import com.digitazon.poscoffee.services.ProductsService;
import com.digitazon.poscoffee.services.SettingsService;
import com.digitazon.poscoffee.services.StatisticsService;
import com.digitazon.poscoffee.services.UsersService;
import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.exceptions.ProgerException;
import com.digitazon.poscoffee.shared.exceptions.ResourceNotFoundException;

@RestController
@CrossOrigin
@Validated
public class AdminAppController {

  @Autowired
  private UsersService usersService;

  @Autowired
  private CategoriesService categoriesService;

  @Autowired
  private ProductsService productService;

  @Autowired
  private SettingsService settingsService;

  @Autowired
  private StatisticsService statisticsService;

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

  @GetMapping(path = AppConstants.ApiEndpoint.Admin.APP_STATISTICS)
  @ResponseStatus(HttpStatus.OK)
  @PreAuthorize("hasAuthority('ADMIN')")
  public Statistics getAppStatistics() throws IOException, InterruptedException, ExecutionException {
    return this.statisticsService.getStatistics();
  }

  @GetMapping(path = AppConstants.ApiEndpoint.Admin.APP_SEARCH)
  @ResponseStatus(HttpStatus.OK)
  @PreAuthorize("hasAuthority('ADMIN')")
  public SearchAdminResult search(
    @RequestParam(AppConstants.PARAM_SEARCH_STRING) String searchString
  ) throws IOException, InterruptedException, ExecutionException {
    final SearchAdminResult searchResult = SearchAdminResult.builder().build();
    final List<Callable<SearchAdminResult>> tasks = new ArrayList<Callable<SearchAdminResult>>();

    tasks.add(this.searchUsers(searchString, searchResult, this.usersService));
    tasks.add(this.searchProducts(searchString, searchResult, this.productService));
    tasks.add(this.searchCategories(searchString, searchResult, this.categoriesService));

    final ExecutorService executor = Executors.newFixedThreadPool(tasks.size());
    final Future<SearchAdminResult> result = executor.invokeAll(tasks).get(0);

    return result.get();
  }

  private Callable<SearchAdminResult> searchUsers(String searchString, SearchAdminResult result, UsersService service) {
    return new Callable<SearchAdminResult>() {

      @Override
      public SearchAdminResult call() throws Exception {
        final List<ClientUser> users = service.searchUsers(searchString);
        result.setUsers(users);

        return result;
      }

    };
  }

  private Callable<SearchAdminResult> searchProducts(
    String searchString, SearchAdminResult result, ProductsService service
  ) {
    return new Callable<SearchAdminResult>() {

      @Override
      public SearchAdminResult call() throws Exception {
        final List<SearchProductsResult> products = service.searchProducts(searchString);
        result.setProducts(products);

        return result;
      }

    };
  }

  private Callable<SearchAdminResult> searchCategories(
    String searchString, SearchAdminResult result, CategoriesService service
  ) {
    return new Callable<SearchAdminResult>() {

      @Override
      public SearchAdminResult call() throws Exception {
        final List<ClientCategory> categories = service.searchCategories(searchString);
        result.setCategories(categories);

        return result;
      }

    };
  }

}
