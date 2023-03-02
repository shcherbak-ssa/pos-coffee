package com.digitazon.poscoffee.models.helpers;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@Data
@AllArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class OrdersFilter extends BasePageFilter {

  @Builder.Default
  private Boolean forApp = false;

}
