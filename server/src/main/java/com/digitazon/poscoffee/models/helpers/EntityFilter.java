package com.digitazon.poscoffee.models.helpers;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class EntityFilter {

  @Builder.Default
  private Boolean onlyArchived = false;

}
