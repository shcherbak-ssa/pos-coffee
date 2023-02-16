package com.digitazon.poscoffee.controllers.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.digitazon.poscoffee.models.helpers.ClientUser;
import com.digitazon.poscoffee.modules.auth.AuthUserDetails;
import com.digitazon.poscoffee.services.UsersService;
import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.exceptions.ResourceNotFoundException;

@RestController
public class UsersController {

  @Autowired
  private UsersService service;

  @GetMapping(path = AppConstants.ApiEndpoint.USERS)
  @ResponseStatus(HttpStatus.OK)
  public ClientUser getUser(Authentication authentication) throws ResourceNotFoundException {
    final AuthUserDetails userDetails = (AuthUserDetails) authentication.getPrincipal();

    return this.service.findUserById(userDetails.getId());
  }

}
