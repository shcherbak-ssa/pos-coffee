package com.digitazon.poscoffee.shared.exceptions;

import com.digitazon.poscoffee.shared.constants.AppConstants;

public class UnauthorizedUserException extends Exception {

  public UnauthorizedUserException() {
    super(AppConstants.UNAUTHORIZED_ERROR_MESSAGE);
  }

}
