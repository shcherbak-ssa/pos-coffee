package com.digitazon.poscoffee.models.helpers;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class OrderFilter {

  private Date createdAt;

}
