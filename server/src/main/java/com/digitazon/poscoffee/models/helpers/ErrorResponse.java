package com.digitazon.poscoffee.models.helpers;

import java.util.HashMap;
import java.util.Map;

import com.digitazon.poscoffee.shared.constants.AppConstants;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse {

  private String type = AppConstants.ErrorType.SERVER;
  private String message;
  private Map<String, String> errors;

  public Map<String, Object> toObject() {
    final Map<String, Object> object = new HashMap<>();

    object.put("type", this.type);
    object.put("message", this.message);
    object.put("errors", this.errors);

    return object;
  }

}
