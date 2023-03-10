package com.digitazon.poscoffee.models.helpers.config;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConfigCategory {

  private String name;
  private Boolean isAvailable;

}
