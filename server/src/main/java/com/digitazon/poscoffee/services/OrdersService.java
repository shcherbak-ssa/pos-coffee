package com.digitazon.poscoffee.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.stereotype.Service;

import com.digitazon.poscoffee.configs.AppConfig;
import com.digitazon.poscoffee.models.Order;
import com.digitazon.poscoffee.models.OrderLine;
import com.digitazon.poscoffee.models.ProductVariant;
import com.digitazon.poscoffee.models.helpers.ClientOrder;
import com.digitazon.poscoffee.repositories.OrderLinesRepository;
import com.digitazon.poscoffee.repositories.OrdersRepository;
import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.helpers.Helpers;

@Service
public class OrdersService {

  // @TODO: conver to annotation
  private AnnotationConfigApplicationContext context
    = new AnnotationConfigApplicationContext(AppConfig.class);

  @Autowired
  private OrdersRepository repository;

  @Autowired
  private OrderLinesRepository liensRepository;

  public List<ClientOrder> getOrders() {
    final List<Order> orders = this.repository.findAll();

    return orders
      .stream()
      .map(this::convertToClientOrder)
      .collect(Collectors.toList());
  }

  public Order createOrder(Order order) {
    final float total = this.calculateTotal(order);
    order.setTotal(total);

    return this.repository.save(order);
  }

  public OrderLine createOrderLine(OrderLine line) {
    return this.liensRepository.save(line);
  }

  private float calculateTotal(Order order) {
    final List<OrderLine> lines = order.getLines();
    float total = AppConstants.ZERO;

    for (OrderLine orderLine : lines) {
      final ProductVariant variant = orderLine.getVariant();
      final float price = Helpers.getProductVariantPrice(variant);

      total += orderLine.getCount() * price;
    }

    return total;
  }

  private ClientOrder convertToClientOrder(Order order) {
    return (ClientOrder) this.context.getBean("clientOrder", order);
  }

}
