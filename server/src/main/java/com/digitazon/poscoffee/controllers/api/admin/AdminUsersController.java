package com.digitazon.poscoffee.controllers.api.admin;

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

import com.digitazon.poscoffee.models.Address;
import com.digitazon.poscoffee.models.helpers.PageResponse;
import com.digitazon.poscoffee.models.helpers.client.ClientUser;
import com.digitazon.poscoffee.models.helpers.filters.UsersFilter;
import com.digitazon.poscoffee.services.AddressService;
import com.digitazon.poscoffee.services.UsersService;
import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.exceptions.AlreadyExistException;
import com.digitazon.poscoffee.shared.exceptions.ResourceNotFoundException;

@RestController
@CrossOrigin
@Validated
public class AdminUsersController {

  @Autowired
  private UsersService service;

  @Autowired
  private AddressService addressService;

  @GetMapping(path = AppConstants.ApiEndpoint.Admin.USERS)
  @ResponseStatus(HttpStatus.OK)
  @PreAuthorize("hasAuthority('ADMIN')")
  public PageResponse<ClientUser> getUsers(
    @RequestParam(AppConstants.PARAM_IS_ARCHIVED) boolean isArchived,
    @RequestParam(AppConstants.PARAM_PAGE) int page,
    @RequestParam(AppConstants.PARAM_PAGE_SIZE) int pageSize
  ) {
    final UsersFilter filter = UsersFilter.builder()
      .isArchived(isArchived)
      .page(page)
      .pageSize(pageSize)
      .build();

    return this.service.getUsersByPage(filter);
  }

  @GetMapping(path = AppConstants.ApiEndpoint.Admin.USERS_ID)
  @ResponseStatus(HttpStatus.OK)
  @PreAuthorize("hasAuthority('ADMIN')")
  public ClientUser getUserById(@PathVariable Long id) throws ResourceNotFoundException {
    return this.service.findUserById(id);
  }

  @PostMapping(path = AppConstants.ApiEndpoint.Admin.USERS)
  @ResponseStatus(HttpStatus.CREATED)
  @PreAuthorize("hasAuthority('ADMIN')")
  public ClientUser createUser(
    @RequestBody @Validated(AppConstants.ValidationGroups.ToCreate.class) ClientUser userToCreate
  ) throws AlreadyExistException {
    final Address createdAdress = this.addressService.createAddress(userToCreate.getAddress());
    userToCreate.setAddress(createdAdress);

    return this.service.createUser(userToCreate);
  }

  @PutMapping(path = AppConstants.ApiEndpoint.Admin.USERS)
  @ResponseStatus(HttpStatus.NO_CONTENT)
  @PreAuthorize("hasAuthority('ADMIN')")
  public void updateUser(
    @RequestBody @Validated(AppConstants.ValidationGroups.ToUpdate.class) ClientUser updates
  ) throws AlreadyExistException, ResourceNotFoundException {
    final Address addressUpdates = updates.getAddress();

    if (addressUpdates != null) {
      this.addressService.updateAddress(addressUpdates);
    }

    this.service.updateUser(updates);
  }

  @PutMapping(path = AppConstants.ApiEndpoint.Admin.USERS_ARCHIVE)
  @ResponseStatus(HttpStatus.NO_CONTENT)
  @PreAuthorize("hasAuthority('ADMIN')")
  public void archiveUser(@PathVariable Long id) throws ResourceNotFoundException {
    this.service.archiveUserById(id);
  }

  @PutMapping(path = AppConstants.ApiEndpoint.Admin.USERS_RESTORE)
  @ResponseStatus(HttpStatus.NO_CONTENT)
  @PreAuthorize("hasAuthority('ADMIN')")
  public void restoreUser(@PathVariable Long id) throws ResourceNotFoundException {
    this.service.restoreUserById(id);
  }

}
