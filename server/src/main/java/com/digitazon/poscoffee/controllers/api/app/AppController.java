package com.digitazon.poscoffee.controllers.api.app;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.digitazon.poscoffee.models.helpers.UserFilter;
import com.digitazon.poscoffee.models.helpers.client.ClientUser;
import com.digitazon.poscoffee.services.UsersService;
import com.digitazon.poscoffee.shared.constants.AppConstants;

@RestController
@CrossOrigin
public class AppController {

  @Autowired
  private UsersService usersService;

  @GetMapping(path = AppConstants.ApiEndpoint.App.APP_USERS)
  @ResponseStatus(HttpStatus.OK)
  @PreAuthorize("hasAuthority('MANAGER')")
  public List<ClientUser> getUsers() {
    final UserFilter filter = UserFilter.builder()
      .forApp(true)
      .build();

    return this.usersService.getUsers(filter);
  }

}
