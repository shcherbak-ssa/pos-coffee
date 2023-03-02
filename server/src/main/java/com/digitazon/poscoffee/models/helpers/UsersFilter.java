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
public class UsersFilter extends BasePageFilter {

  private Boolean isArchived;

  @Builder.Default
  private Boolean forApp = false;

}
