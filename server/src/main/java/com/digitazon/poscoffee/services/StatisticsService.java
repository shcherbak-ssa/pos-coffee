package com.digitazon.poscoffee.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.digitazon.poscoffee.models.helpers.statistics.CountPerDay;
import com.digitazon.poscoffee.models.helpers.statistics.Statistics;
import com.digitazon.poscoffee.models.helpers.statistics.TotalOrders;
import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.helpers.LocalResourceLoader;

@Service
public class StatisticsService {

  @Autowired
  private JdbcTemplate jdbcTemplate;

  @Autowired
  private LocalResourceLoader localResourceLoader;

  public Statistics getStatistics() throws IOException, InterruptedException, ExecutionException {
    final Statistics statistics = Statistics.builder().build();
    final List<Callable<Statistics>> tasks = new ArrayList<Callable<Statistics>>();

    tasks.add(this.totalOrders(statistics, this));
    tasks.add(this.averageIncome(statistics, this));
    tasks.add(this.averageOrders(statistics, this));
    tasks.add(this.countsPerDay(statistics, this));

    final ExecutorService executor = Executors.newFixedThreadPool(tasks.size());
    final Future<Statistics> result = executor.invokeAll(tasks).get(0);

    return result.get();
  }

  private Callable<Statistics> totalOrders(Statistics statistics, StatisticsService service) {
    return new Callable<Statistics>() {

      @Override
      public Statistics call() throws Exception {
        service.loadTotalOrders(statistics);
        return statistics;
      }

    };
  }

  private Callable<Statistics> averageIncome(Statistics statistics, StatisticsService service) {
    return new Callable<Statistics>() {

      @Override
      public Statistics call() throws Exception {
        service.loadAverageIncome(statistics);
        return statistics;
      }

    };
  }

  private Callable<Statistics> averageOrders(Statistics statistics, StatisticsService service) {
    return new Callable<Statistics>() {

      @Override
      public Statistics call() throws Exception {
        service.loadAverageOrders(statistics);
        return statistics;
      }

    };
  }

  private Callable<Statistics> countsPerDay(Statistics statistics, StatisticsService service) {
    return new Callable<Statistics>() {

      @Override
      public Statistics call() throws Exception {
        service.loadCountsPerDay(statistics);
        return statistics;
      }

    };
  }

  private void loadTotalOrders(Statistics statistics) throws IOException {
    final String sqlScript = this.localResourceLoader.loadSqlScript(AppConstants.SQL_ORDERS_TOTAL_FILENAME);
    final TotalOrders totalStatistics = this.jdbcTemplate.queryForObject(sqlScript, TotalOrders::parse);

    statistics.setTotal(totalStatistics);
  }

  private void loadAverageIncome(Statistics statistics) throws IOException {
    final String sqlScript = this.localResourceLoader.loadSqlScript(AppConstants.SQL_AVERAGE_INCOME_FILENAME);
    final Float average = this.jdbcTemplate.queryForObject(sqlScript, Float.class);

    statistics.setAverageIncome(average);
  }

  private void loadAverageOrders(Statistics statistics) throws IOException {
    final String sqlScript = this.localResourceLoader.loadSqlScript(AppConstants.SQL_AVERAGE_ORDERS_FILENAME);
    final Float average = this.jdbcTemplate.queryForObject(sqlScript, Float.class);

    statistics.setAverageOrders(average);
  }

  private void loadCountsPerDay(Statistics statistics) throws IOException, DataAccessException {
    final String sqlScript = this.localResourceLoader.loadSqlScript(AppConstants.SQL_COUNTS_PER_DAY);
    final List<CountPerDay> counsPerDay = this.jdbcTemplate.query(sqlScript, CountPerDay::parse);

    statistics.setCountsPerDay(counsPerDay);
  }

}
