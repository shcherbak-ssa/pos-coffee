package com.digitazon.poscoffee.controllers.api.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.digitazon.poscoffee.models.helpers.client.ClientOrder;
import com.digitazon.poscoffee.services.OrdersService;
import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.exceptions.ResourceNotFoundException;

@RestController
@CrossOrigin
public class AdminOrdersController {

  @Autowired
  private OrdersService service;

  @GetMapping(path = AppConstants.ApiEndpoint.Admin.ORDERS)
  @ResponseStatus(HttpStatus.OK)
  @PreAuthorize("hasAuthority('ADMIN')")
  public List<ClientOrder> getOrders() {
    return this.service.getOrders();
  }

  @GetMapping(path = AppConstants.ApiEndpoint.Admin.ORDERS_ID)
  @ResponseStatus(HttpStatus.OK)
  @PreAuthorize("hasAuthority('ADMIN')")
  public ClientOrder getOrderById(@PathVariable Long id) throws ResourceNotFoundException {
    return this.service.getOrderById(id);
  }

}
