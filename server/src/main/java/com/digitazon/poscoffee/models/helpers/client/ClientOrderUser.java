package com.digitazon.poscoffee.models.helpers.client;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClientOrderUser {

  private Long id;
  private String name;
  private String surname;

}
