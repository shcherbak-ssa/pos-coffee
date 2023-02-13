package com.digitazon.poscoffee.controllers.api.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.digitazon.poscoffee.models.helpers.ClientUser;
import com.digitazon.poscoffee.services.UsersService;
import com.digitazon.poscoffee.shared.constants.AppConstants;

@RestController
public class UsersAdminController {

  @Autowired
  private UsersService service;

  @GetMapping(path = AppConstants.ApiEndpoint.Admin.USERS)
  @ResponseStatus(HttpStatus.OK)
  public List<ClientUser> getUsers(Authentication authentication) {
    return this.service.getUsers();
  }

}
