package com.digitazon.poscoffee.models.helpers;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConfigProductVariant {

  private String sku;
  private String name;
  private Float price;
  private Integer stock;
  private Integer stockPerTime;
  private Boolean useProductPrice;
  private Long product;

}
