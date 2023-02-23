package com.digitazon.poscoffee.shared.helpers;

import java.util.Random;

import com.digitazon.poscoffee.models.UserType;
import com.digitazon.poscoffee.services.UserTypesService;
import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.constants.UsersConstants;
import com.digitazon.poscoffee.shared.exceptions.ProgerException;

public class Helpers {

  public static final UserType converUserTypeToEnumValue(
    UserTypesService userTypesService,
    String userType
  ) throws ProgerException {

    UsersConstants.UserType type = null;

    switch (userType) {
      case UsersConstants.ConfigUserType.ADMIN:
        type = UsersConstants.UserType.ADMIN;
        break;
      case UsersConstants.ConfigUserType.MANAGER:
        type = UsersConstants.UserType.MANAGER;
        break;
      case UsersConstants.ConfigUserType.WAITER:
        type = UsersConstants.UserType.WAITER;
        break;
    }

    if (type == null) {
      throw new ProgerException(String.format("Unknown user type %s", userType));
    }

    return userTypesService.getByName(type);
  }

  public static String generatePassword() {
    final int passwordLength = UsersConstants.MIN_PASSWORD_LENGTH;
    final StringBuilder builder = new StringBuilder(passwordLength);
    final Random random = new Random();

    for (int i = 0; i < passwordLength; i += 1) {
      builder.append(
        AppConstants.PASSWORD_GENERATOR_HELPER_STRING.charAt(
          random.nextInt(AppConstants.PASSWORD_GENERATOR_HELPER_STRING.length())
        )
      );
    }

    return builder.toString();
  }

}
