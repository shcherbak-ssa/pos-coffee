package com.digitazon.poscoffee.shared.constants;

import javax.validation.groups.Default;

public class AppConstants {

  public static final int MIN_UPDATE_LENGTH = 1;

  public static final String EMPTY_STRING = "";
  public static final String PASSWORD_GENERATOR_HELPER_STRING = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  public static final String POSCOFFEE_CONFIG_FILENAME = "poscoffee/poscoffee.config.json";
  public static final String POSCOFFEE_PROPS_FILENAME = "classpath:poscoffee/poscoffee.properties";

  public static final String AUTHORIZATION_HEADER = "Authorization";
  public static final String AUTHORIZATION_TYPE = "Bearer";
  public static final String AUTHORIZATION_DIVIDER = " ";
  public static final String ANONYMOUS_USER = "anonymousUser";

  public static final String ID_EMPTY_MESSAGE = "Id cannot be empty";
  public static final String UNAUTHORIZED_ERROR_MESSAGE = "Unauthorized";
  public static final String VALIDATION_ERROR_MESSAGE = "Validation error";
  public static final String BAD_CREDENTIALS_MESSAGE = "Invalid email or password";
  public static final String ACCESS_DENY_MESSAGE = "Access denied";

  public static final String ACCESS_DENIED_ERROR = "AccessDeniedException";

  public static final class Entity {
    public static final String USER = "User";
    public static final String PRODUCT = "Product";
    public static final String CATEGORY = "Category";
  }

  public static final class ApiEndpoint {
    public static final String AUTH_LOGIN = "/api/auth/login";
    public static final String USERS = "/api/users";

    public static final class Admin {
      public static final String USERS = "/api/admin/users";
      public static final String USERS_ID = "/api/admin/users/{id}";
      public static final String USERS_ARCHIVE = "/api/admin/users/{id}/archive";
      public static final String USERS_RESTORE = "/api/admin/users/{id}/restore";
      public static final String PRODUCTS = "/api/admin/products";
      public static final String PRODUCTS_ID = "/api/admin/products/{id}";
      public static final String PRODUCTS_ARCHIVE = "/api/admin/products/{id}/archive";
      public static final String PRODUCTS_RESTORE = "/api/admin/products/{id}/restore";
      public static final String CATEGORIES = "/api/admin/categories";
      public static final String CATEGORIES_ARCHIVE = "/api/admin/categories/{id}/archive";
      public static final String CATEGORIES_RESTORE = "/api/admin/categories/{id}/restore";
    }
  }

  public static class DatabaseTable {
    public static final String USERS = "users";
    public static final String USER_TYPES = "user_types";
    public static final String USER_TYPE_JOIN = "user_type_join";
    public static final String ADDRESSES = "addresses";
    public static final String PRODUCTS = "products";
    public static final String CATEGORIES = "categories";
  }

  public static enum ErrorType {
    AUTH,
    SERVER,
    CLIENT,
    VALIDATION
  }

  public static interface ValidationGroups {
    public interface ToCreate extends Default {}
    public interface ToUpdate extends Default {}
  }

}
