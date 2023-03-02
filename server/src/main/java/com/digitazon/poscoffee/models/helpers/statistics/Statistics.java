package com.digitazon.poscoffee.models.helpers.statistics;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Statistics {

  private TotalOrders total;
  private Float averageIncome;
  private Float averageOrders;
  private List<CountPerDay> countsPerDay;

}
