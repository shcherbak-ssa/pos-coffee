package com.digitazon.poscoffee.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.digitazon.poscoffee.models.PaymentMethod;
import com.digitazon.poscoffee.shared.constants.OrdersConstants;

public interface PaymentMethodsRepository extends JpaRepository<PaymentMethod, Long> {

  public PaymentMethod findByName(OrdersConstants.PaymentMethod name);

}
