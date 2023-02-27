package com.digitazon.poscoffee.models.helpers;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class ProductFilter {

  private Boolean isArchived;
  private Boolean isAvailable;
  private String[] nullLabels;

}
