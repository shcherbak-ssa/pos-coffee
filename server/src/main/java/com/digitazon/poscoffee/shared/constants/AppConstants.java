package com.digitazon.poscoffee.shared.constants;

public class AppConstants {

  public static final String EMPTY_STRING = "";

  public static final String POSCOFFEE_CONFIG_FILENAME = "poscoffee/poscoffee.config.json";
  public static final String POSCOFFEE_PROPS_FILENAME = "classpath:poscoffee/poscoffee.properties";

  public static final String AUTHORIZATION_HEADER = "Authorization";
  public static final String AUTHORIZATION_TYPE = "Bearer";
  public static final String AUTHORIZATION_DIVIDER = " ";

  public static final String BAD_CREDENTIALS_MESSAGE = "Invalid username or password";

  public static final class ApiEndpoint {
    public static final String AUTH_LOGIN = "/api/auth/login";
  }

  public static class DatabaseTable {
    public static final String USERS = "users";
    public static final String USER_TYPES = "user_types";
    public static final String USER_TYPE_JOIN = "user_type_join";
  }

  public static class ErrorType {
    public static final String SERVER = "server";
    public static final String CLIENT = "client";
    public static final String VALIDATION = "validation";
  }

}
