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
public class TotalOrders {

  private Float orders;
  private Float income;

  public static TotalOrders parse(ResultSet result, int count) throws SQLException {
    return TotalOrders.builder()
      .orders(result.getFloat("orders"))
      .income(result.getFloat("income"))
      .build();
  }

}
