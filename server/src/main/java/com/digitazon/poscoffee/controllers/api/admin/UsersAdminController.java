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

import com.digitazon.poscoffee.models.helpers.ClientUser;
import com.digitazon.poscoffee.models.helpers.UserFilter;
import com.digitazon.poscoffee.services.UsersService;
import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.exceptions.AlreadyExistException;
import com.digitazon.poscoffee.shared.exceptions.ProgerException;
import com.digitazon.poscoffee.shared.exceptions.ResourceNotFoundException;

@RestController
@CrossOrigin
@Validated
public class UsersAdminController {

  @Autowired
  private UsersService service;

  @GetMapping(path = AppConstants.ApiEndpoint.Admin.USERS)
  @ResponseStatus(HttpStatus.OK)
  @PreAuthorize("hasAuthority('ADMIN')")
  public List<ClientUser> getUsers(UserFilter filter) {
    return this.service.getUsers(filter);
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
  ) throws ProgerException, AlreadyExistException {
    return this.service.createUser(userToCreate);
  }

  @PutMapping(path = AppConstants.ApiEndpoint.Admin.USERS)
  @ResponseStatus(HttpStatus.NO_CONTENT)
  @PreAuthorize("hasAuthority('ADMIN')")
  public void updateUser(
    @RequestBody @Validated(AppConstants.ValidationGroups.ToUpdate.class) ClientUser updates
  ) throws ResourceNotFoundException {
    this.service.updateUser(updates);
  }

  @PutMapping(path = AppConstants.ApiEndpoint.Admin.USERS_DELETE)
  @ResponseStatus(HttpStatus.NO_CONTENT)
  @PreAuthorize("hasAuthority('ADMIN')")
  public void deleteUser(@PathVariable Long id) throws ResourceNotFoundException {
    this.service.deleteUserById(id);
  }

  @PutMapping(path = AppConstants.ApiEndpoint.Admin.USERS_RESTORE)
  @ResponseStatus(HttpStatus.NO_CONTENT)
  @PreAuthorize("hasAuthority('ADMIN')")
  public void restoreUser(@PathVariable Long id) throws ResourceNotFoundException {
    this.service.restoreUserById(id);
  }

}
