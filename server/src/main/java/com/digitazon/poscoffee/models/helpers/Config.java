package com.digitazon.poscoffee.models.helpers;

import java.util.List;

import com.digitazon.poscoffee.models.User;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Config {

  private List<User> users;

}
