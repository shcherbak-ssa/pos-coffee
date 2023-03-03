package com.digitazon.poscoffee.models.helpers.filters;

import java.util.List;

import com.digitazon.poscoffee.models.helpers.client.ClientCategory;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@Data
@AllArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class ProductsFilter extends PageFilter {

  private Boolean isArchived;
  private String[] nullLabels;

  @Builder.Default
  private Boolean forMenu = false;
  private List<ClientCategory> categories;

}
