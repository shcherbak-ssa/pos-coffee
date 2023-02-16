package com.digitazon.poscoffee.shared.constants;

public class UsersConstants {

  public static final int MIN_PASSWORD_LENGTH = 8;
  public static final String PHONE_PATTERN = "\\d{12}";

  public static final String ID_EMPTY_MESSAGE = "Id cannot be empty";
  public static final String NAME_EMPTY_MESSAGE = "Name cannot be empty";
  public static final String SURNAME_EMPTY_MESSAGE = "Surname cannot be empty";
  public static final String PHONE_EMPTY_MESSAGE = "Phone cannot be empty";
  public static final String PHONE_PATTER_MESSAGE = "Phone number must contain 12 digits";
  public static final String EMAIL_EMPTY_MESSAGE = "Email cannot be empty";
  public static final String EMAIL_INVALID_MESSAGE = "Email is invalid";
  public static final String PASSWORD_LENGTH_MESSAGE = "Password must be at least 8 characters";
  public static final String PASSWORD_EMPTY_MESSAGE = "Password cannot be empty";
  public static final String TYPE_EMPTY_MESSAGE = "Type cannot be empty";
  public static final String USER_ALREADY_EXIST_MESSAGE = "Email already exists";
  public static final String CANNOT_CHANGE_TYPE_MESSAGE = "Cannot change the type of an existing user";

  public static final String UNIQUE_FIELD = "email";

  public static enum UserType {
    ADMIN,
    MANAGER,
    WAITER,
  }

  public static final class ConfigUserType {
    public static final String ADMIN = "ADMIN";
    public static final String MANAGER = "MANAGER";
    public static final String WAITER = "WAITER";
  }

}
