package com.digitazon.poscoffee.shared.constants;

public class UsersConstants {

  public static final String NAME_EMPTY_MESSAGE = "Name cannot be empty";
  public static final String SURNAME_EMPTY_MESSAGE = "Surname cannot be empty";
  public static final String PHONE_EMPTY_MESSAGE = "Phone cannot be empty";

  public static final String EMAIL_EMPTY_MESSAGE = "Email cannot be empty";
  public static final String EMAIL_INVALID_MESSAGE = "Email is invalid";

  public static final int MIN_PASSWORD_LENGTH = 8;
  public static final String PASSWORD_LENGTH_MESSAGE = "Password must be at least 8 characters";
  public static final String PASSWORD_EMPTY_MESSAGE = "Password cannot be empty";

  public static enum UserType {
    ADMIN,
    MANAGER,
    WAITER,
  }

}
