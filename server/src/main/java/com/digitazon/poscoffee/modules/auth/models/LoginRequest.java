package com.digitazon.poscoffee.modules.auth.models;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.digitazon.poscoffee.shared.constants.UsersConstants;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginRequest {

  @NotBlank
  @Size(min = UsersConstants.MIN_USERNAME_LENGTH)
  private String username;

  @NotBlank
  @Size(min = UsersConstants.MIN_PASSWORD_LENGTH)
  private String password;

}
