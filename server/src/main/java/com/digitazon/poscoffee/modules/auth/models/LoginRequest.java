package com.digitazon.poscoffee.modules.auth.models;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.digitazon.poscoffee.shared.constants.UsersConstants;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {

  @NotBlank(message = UsersConstants.EMAIL_EMPTY_MESSAGE)
  @Email(message = UsersConstants.EMAIL_INVALID_MESSAGE)
  private String email;

  @NotBlank(message = UsersConstants.PASSWORD_EMPTY_MESSAGE)
  @Size(min = UsersConstants.MIN_PASSWORD_LENGTH, message = UsersConstants.PASSWORD_LENGTH_MESSAGE)
  private String password;

}
