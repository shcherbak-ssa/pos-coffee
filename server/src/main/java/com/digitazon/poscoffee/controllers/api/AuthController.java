package com.digitazon.poscoffee.controllers.api;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.digitazon.poscoffee.modules.auth.AuthJwtUtils;
import com.digitazon.poscoffee.modules.auth.models.LoginRequest;
import com.digitazon.poscoffee.modules.auth.models.LoginResponse;
import com.digitazon.poscoffee.shared.constants.AppConstants;

@RestController
@CrossOrigin
public class AuthController {

  @Autowired
  private AuthenticationManager authManager;

  @Autowired
  private AuthJwtUtils authJwtUtils;

  @PostMapping(path = AppConstants.ApiEndpoint.AUTH_LOGIN)
  @ResponseStatus(HttpStatus.OK)
  public LoginResponse login(@RequestBody @Valid LoginRequest request) {
    final Authentication authentication = this.authManager.authenticate(
      new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
    );

    SecurityContextHolder.getContext().setAuthentication(authentication);

    final String authToken = this.authJwtUtils.generateAuthToken(authentication);
    final LoginResponse response = new LoginResponse(authToken); // @TODO: add context

    return response;
  }

}
