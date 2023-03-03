package com.digitazon.poscoffee.models.helpers.statistics;

import java.sql.ResultSet;
import java.sql.SQLException;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductsCount {

  private Long count;
  private String name;

  public static ProductsCount parse(ResultSet result, int count) throws SQLException {
    return ProductsCount.builder()
      .count(result.getLong("count"))
      .name(result.getString("name"))
      .build();
  }

}
