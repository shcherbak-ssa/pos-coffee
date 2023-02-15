package com.digitazon.poscoffee.shared.exceptions;

import java.util.HashMap;
import java.util.Map;

public class AlreadyExistException extends Exception {

  private String field;

  public AlreadyExistException(String field, String message) {
    super(message);
    this.field = field;
  }

  public Map<String, String> getErrors() {
    final Map<String, String> object = new HashMap<>();
    object.put(this.field, this.getMessage());

    return object;
  }

}
