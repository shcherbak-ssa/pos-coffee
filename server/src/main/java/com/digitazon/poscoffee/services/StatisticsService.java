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
import com.digitazon.poscoffee.models.helpers.statistics.ProductsCount;
import com.digitazon.poscoffee.models.helpers.statistics.Statistics;
import com.digitazon.poscoffee.models.helpers.statistics.TotalOrders;
import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.helpers.LocalResourceLoader;

@Service
public class StatisticsService {

  @Autowired
  private JdbcTemplate jdbcTemplate;

  private String ordersTotalSql;
  private String averageIncomeSql;
  private String averageOrdersSql;
  private String countsPerDaySql;
  private String productsCountAscSql;
  private String productsCountDescSql;

  public StatisticsService(@Autowired LocalResourceLoader localResourceLoader) throws IOException {
    this.ordersTotalSql = localResourceLoader.loadSqlScript(AppConstants.SQL_ORDERS_TOTAL_FILENAME);
    this.averageIncomeSql = localResourceLoader.loadSqlScript(AppConstants.SQL_AVERAGE_INCOME_FILENAME);
    this.averageOrdersSql = localResourceLoader.loadSqlScript(AppConstants.SQL_AVERAGE_ORDERS_FILENAME);
    this.countsPerDaySql = localResourceLoader.loadSqlScript(AppConstants.SQL_COUNTS_PER_DAY);

    final String productsCountSql = localResourceLoader.loadSqlScript(AppConstants.SQL_PRODUCTS_COUNT);
    this.productsCountAscSql
      = productsCountSql.replace(AppConstants.SQL_REPLACE_SYMBOL, AppConstants.Sort.ASC.name());
    this.productsCountDescSql
      = productsCountSql.replace(AppConstants.SQL_REPLACE_SYMBOL, AppConstants.Sort.DESC.name());
  }

  public Statistics getStatistics() throws IOException, InterruptedException, ExecutionException {
    final Statistics statistics = Statistics.builder().build();
    final List<Callable<Statistics>> tasks = new ArrayList<Callable<Statistics>>();

    tasks.add(this.totalOrders(statistics, this));
    tasks.add(this.averageIncome(statistics, this));
    tasks.add(this.averageOrders(statistics, this));
    tasks.add(this.countsPerDay(statistics, this));
    tasks.add(this.productsCounts(statistics, this));

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

  private Callable<Statistics> productsCounts(Statistics statistics, StatisticsService service) {
    return new Callable<Statistics>() {

      @Override
      public Statistics call() throws Exception {
        service.loadProductsCounts(statistics);
        return statistics;
      }

    };
  }

  private void loadTotalOrders(Statistics statistics) throws IOException {
    final TotalOrders totalStatistics = this.jdbcTemplate.queryForObject(this.ordersTotalSql, TotalOrders::parse);

    statistics.setTotal(totalStatistics);
  }

  private void loadAverageIncome(Statistics statistics) throws IOException {
    final Float average = this.jdbcTemplate.queryForObject(this.averageIncomeSql, Float.class);

    statistics.setAverageIncome(average);
  }

  private void loadAverageOrders(Statistics statistics) throws IOException {
    final Float average = this.jdbcTemplate.queryForObject(this.averageOrdersSql, Float.class);

    statistics.setAverageOrders(average);
  }

  private void loadCountsPerDay(Statistics statistics) throws IOException, DataAccessException {
    final List<CountPerDay> counsPerDay = this.jdbcTemplate.query(this.countsPerDaySql, CountPerDay::parse);

    statistics.setCountsPerDay(counsPerDay);
  }

  private void loadProductsCounts(Statistics statistics) throws IOException, DataAccessException {
    final List<ProductsCount> topIgnored = this.jdbcTemplate.query(this.productsCountAscSql, ProductsCount::parse);
    final List<ProductsCount> bestsellers = this.jdbcTemplate.query(this.productsCountDescSql, ProductsCount::parse);

    statistics.setTopIgnored(topIgnored);
    statistics.setBestsellers(bestsellers);
  }

}
