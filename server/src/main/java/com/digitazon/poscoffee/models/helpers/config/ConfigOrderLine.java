package com.digitazon.poscoffee.models.helpers.config;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConfigOrderLine {

  private Short count;
  private Long product;
  private Long variant;

}
