package com.digitazon.poscoffee.models.helpers.statistics;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CountPerDay {

  private Date workDay;
  private Float income;
  private Float orders;

  public static CountPerDay parse(ResultSet result, int count) throws SQLException {
    return CountPerDay.builder()
      .workDay(result.getDate("work_day"))
      .income(result.getFloat("income"))
      .orders(result.getFloat("orders"))
      .build();
  }

}
