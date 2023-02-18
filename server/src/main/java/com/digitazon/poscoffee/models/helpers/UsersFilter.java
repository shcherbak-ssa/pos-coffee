package com.digitazon.poscoffee.models.helpers;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UsersFilter {

  private Boolean onlyArchived = false;

}
