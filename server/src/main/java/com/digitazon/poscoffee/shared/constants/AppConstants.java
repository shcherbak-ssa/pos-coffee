package com.digitazon.poscoffee.shared.constants;

public class AppConstants {

  public static final String EMPTY_STRING = "";

  public static final String POSCOFFEE_CONFIG_FILENAME = "poscoffee/poscoffee.config.json";
  public static final String POSCOFFEE_PROPS_FILENAME = "classpath:poscoffee/poscoffee.properties";

  public static final String AUTHORIZATION_HEADER = "Authorization";
  public static final String AUTHORIZATION_TYPE = "Bearer";
  public static final String AUTHORIZATION_DIVIDER = " ";

  public static final class ApiEndpoint {
    public static final String AUTH_LOGIN = "/api/auth/login";
  }

}
