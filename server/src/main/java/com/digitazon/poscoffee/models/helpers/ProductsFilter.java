package com.digitazon.poscoffee.models.helpers;

import java.util.List;

import com.digitazon.poscoffee.models.helpers.client.ClientCategory;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class ProductsFilter {

  private Boolean isArchived;
  private Boolean isAvailable;
  private String[] nullLabels;

  @Builder.Default
  private Boolean forMenu = false;
  private List<ClientCategory> categories;

}
