package com.digitazon.poscoffee.models.helpers;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductsFilter {

  private Boolean onlyArchived = false;

}
