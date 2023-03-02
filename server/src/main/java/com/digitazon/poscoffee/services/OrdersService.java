package com.digitazon.poscoffee.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.digitazon.poscoffee.configs.AppConfig;
import com.digitazon.poscoffee.models.Order;
import com.digitazon.poscoffee.models.OrderLine;
import com.digitazon.poscoffee.models.constants.PaymentMethod;
import com.digitazon.poscoffee.models.helpers.OrdersFilter;
import com.digitazon.poscoffee.models.helpers.PageResponse;
import com.digitazon.poscoffee.models.helpers.client.ClientOrder;
import com.digitazon.poscoffee.repositories.OrderLinesRepository;
import com.digitazon.poscoffee.repositories.OrdersRepository;
import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.exceptions.ResourceNotFoundException;

@Service
public class OrdersService {

  // @TODO: conver to annotation
  private AnnotationConfigApplicationContext context
    = new AnnotationConfigApplicationContext(AppConfig.class);

  @Autowired
  private OrdersRepository repository;

  @Autowired
  private OrderLinesRepository linesRepository;

  @Autowired
  private PaymentMethodsService paymentMethodsService;

  public ClientOrder getOrderById(Long id) throws ResourceNotFoundException {
    final Optional<Order> foundOrder = this.repository.findById(id);

    if (foundOrder.isPresent()) {
      return this.convertToClientOrder(foundOrder.get());
    }

    throw new ResourceNotFoundException("Order not found");
  }

  public List<ClientOrder> getOrders(OrdersFilter filter) {
    final List<Order> orders = this.repository.findAll(
      OrdersService.filter(filter),
      Sort.by(Sort.Direction.DESC, AppConstants.ID_FIELD)
    );

    return orders
      .stream()
      .map(this::convertToClientOrder)
      .collect(Collectors.toList());
  }

  public PageResponse<ClientOrder> getOrdersByPage(OrdersFilter filter) {
    final Page<Order> ordersPage = this.repository.findAll(
      OrdersService.filter(filter),
      PageRequest.of(filter.getPage(), filter.getPageSize(), Sort.by(Sort.Direction.DESC, AppConstants.ID_FIELD))
    );

    if (ordersPage.hasContent()) {
      return this.convertToPageResponse(ordersPage, ordersPage.getContent());
    }

    return this.convertToPageResponse(ordersPage, new ArrayList<Order>());
  }

  public ClientOrder createOrder(ClientOrder clientOrder) {
    final Order order = this.convertToOrder(clientOrder);
    final List<OrderLine> lines = new ArrayList<OrderLine>();

    for (OrderLine line : order.getLines()) {
      final OrderLine createdLine = this.createOrderLine(line);
      lines.add(createdLine);
    }

    order.setLines(lines);

    final Order createdOrder = this.createOrder(order);

    return this.convertToClientOrder(createdOrder);
  }

  public Order createOrder(Order order) {
    if (order.getCreatedAt() == null) {
      order.setCreatedAt(new Date());
    }

    return this.repository.save(order);
  }

  public OrderLine createOrderLine(OrderLine line) {
    return this.linesRepository.save(line);
  }

  private ClientOrder convertToClientOrder(Order order) {
    return (ClientOrder) this.context.getBean("clientOrder", order);
  }

  private Order convertToOrder(ClientOrder clientOrder) {
    final PaymentMethod paymentMethod = this.paymentMethodsService.getByName(clientOrder.getPaymentMethod());

    return (Order) this.context.getBean("order", clientOrder, paymentMethod);
  }

  private PageResponse<ClientOrder> convertToPageResponse(Page<Order> page, List<Order> orders) {
    final List<ClientOrder> clientOrders = orders
      .stream()
      .map(this::convertToClientOrder)
      .collect(Collectors.toList());

    return (PageResponse<ClientOrder>) this.context.getBean("pageResponse", page, clientOrders);
  }

  private static Specification<Order> filter(OrdersFilter filter) {
    return new Specification<Order>() {

      @Override
      public Predicate toPredicate(Root<Order> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        final List<Predicate> predicates = new ArrayList<Predicate>();

        if (filter.getForApp()) {
          predicates.add(
            builder.greaterThanOrEqualTo(root.<Date>get("createdAt"), builder.currentDate())
          );
        }

        return builder.and(predicates.toArray(new Predicate[0]));
      }

    };
  }

}
