package com.digitazon.poscoffee.models.helpers.config;

import com.digitazon.poscoffee.models.Address;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConfigUser {

  private String name;
  private String surname;
  private String email;
  private String phone;
  private String password;
  private String type;
  private String image;
  private Address address;
  private Boolean isArchived;

}
