package com.digitazon.poscoffee.models.helpers;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class UsersFilter {

  private Boolean isArchived;

  @Builder.Default
  private Boolean forApp = false;

}
