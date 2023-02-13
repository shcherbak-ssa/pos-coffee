package com.digitazon.poscoffee.models.helpers;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClientUser {

  private Long id;
  private String name;
  private String surname;
  private String email;
  private String phone;
  private String username;
  private String type;

}
