package com.digitazon.poscoffee.models.helpers.filters;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@Data
@AllArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class OrdersFilter extends PageFilter {

  @Builder.Default
  private Boolean forApp = false;

}
