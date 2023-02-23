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
  private Float price;
  private Integer stock;
  private String image;
  private Long category;
  private Boolean useStockForVariants;
  private Boolean isAvailable;
  private Boolean isArchived;

}
