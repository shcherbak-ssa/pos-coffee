package com.digitazon.poscoffee.shared.constants;

public class AppConstants {

  public static final String EMPTY_STRING = "";

  public static final String POSCOFFEE_CONFIG_FILENAME = "poscoffee/poscoffee.config.json";
  public static final String POSCOFFEE_PROPS_FILENAME = "classpath:poscoffee/poscoffee.properties";

  public static final String AUTHORIZATION_HEADER = "Authorization";
  public static final String AUTHORIZATION_TYPE = "Bearer";
  public static final String AUTHORIZATION_DIVIDER = " ";
  public static final String UNAUTHORIZED_ERROR_MESSAGE = "Unauthorized";
  public static final String ANONYMOUS_USER = "anonymousUser";

  public static final String VALIDATION_ERROR_MESSAGE = "Validation error";
  public static final String BAD_CREDENTIALS_MESSAGE = "Invalid email or password";
  public static final String ACCESS_DENY_MESSAGE = "Access denied";
  public static final String ACCESS_DENIED_ERROR = "AccessDeniedException";

  public static final class ApiEndpoint {
    public static final String AUTH_LOGIN = "/api/auth/login";
    public static final String USERS = "/api/users";

    public static final class Admin {
      public static final String USERS = "/api/admin/users";
      public static final String USERS_ID = "/api/admin/users/{id}";
    }
  }

  public static class DatabaseTable {
    public static final String USERS = "users";
    public static final String USER_TYPES = "user_types";
    public static final String USER_TYPE_JOIN = "user_type_join";
  }

  public static final class ConfigUserType {
    public static final String ADMIN = "ADMIN";
    public static final String MANAGER = "MANAGER";
    public static final String WAITER = "WAITER";
  }

  public static enum ErrorType {
    AUTH,
    SERVER,
    CLIENT,
    VALIDATION
  }

}
