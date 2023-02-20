package com.digitazon.poscoffee.models.helpers;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConfigProduct {

  private String sku;
  private String name;
  private Byte price;
  private String image;
  private Boolean isAvailable;
  private Boolean isArchived;

}
