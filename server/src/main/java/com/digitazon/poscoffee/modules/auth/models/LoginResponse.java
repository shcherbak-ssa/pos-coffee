package com.digitazon.poscoffee.modules.auth.models;

import com.digitazon.poscoffee.shared.constants.AppConstants;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoginResponse {

  private String token;
  private String type = AppConstants.AUTHORIZATION_TYPE;

  public LoginResponse(String token) {
    this.token = token;
  }

}
