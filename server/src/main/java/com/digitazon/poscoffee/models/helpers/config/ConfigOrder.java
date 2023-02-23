package com.digitazon.poscoffee.models.helpers.config;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConfigOrder {

  private List<Long> lines;
  private Long user;

}
