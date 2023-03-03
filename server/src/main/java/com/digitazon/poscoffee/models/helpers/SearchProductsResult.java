package com.digitazon.poscoffee.models.helpers;

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
public class SearchProductsResult {

  private Long id;
  private String name;
  private String image;

  public static SearchProductsResult parse(ResultSet result, int count) throws SQLException {
    return SearchProductsResult.builder()
      .id(result.getLong("id"))
      .name(result.getString("name"))
      .image(result.getString("image"))
      .build();
  }

}
