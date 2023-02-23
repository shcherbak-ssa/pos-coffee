package com.digitazon.poscoffee.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.digitazon.poscoffee.models.Order;

public interface OrdersRepository extends JpaRepository<Order, Long> {}
