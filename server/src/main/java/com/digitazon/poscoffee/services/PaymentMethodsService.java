package com.digitazon.poscoffee.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitazon.poscoffee.models.constants.PaymentMethod;
import com.digitazon.poscoffee.repositories.PaymentMethodsRepository;
import com.digitazon.poscoffee.shared.constants.OrdersConstants;

@Service
public class PaymentMethodsService {

  @Autowired
  private PaymentMethodsRepository repository;

  public void loadMethods() {
    for (OrdersConstants.PaymentMethod method : OrdersConstants.PaymentMethod.values()) {
      PaymentMethod paymentMethod = new PaymentMethod();
      paymentMethod.setName(method);

      this.repository.save(paymentMethod);
    }
  }

  public PaymentMethod getByName(OrdersConstants.PaymentMethod name) {
    return this.repository.findByName(name);
  }

  public PaymentMethod getByName(String name) {
    return this.getByName(OrdersConstants.PaymentMethod.valueOf(name));
  }

}
