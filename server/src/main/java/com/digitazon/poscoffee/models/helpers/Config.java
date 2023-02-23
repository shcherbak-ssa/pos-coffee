package com.digitazon.poscoffee.models.helpers;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Config {

  private List<ConfigUser> users;
  private List<ConfigCategory> categories;
  private List<ConfigProduct> products;
  private List<ConfigProductVariant> productVariants;
  private List<ConfigOrder> orders;
  private List<ConfigOrderLine> orderLines;

}
