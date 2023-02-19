package com.digitazon.poscoffee.models.helpers;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CategoriesFilter {

  private Boolean onlyArchived = false;

}
