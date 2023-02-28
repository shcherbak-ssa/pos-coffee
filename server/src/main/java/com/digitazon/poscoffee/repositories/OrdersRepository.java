package com.digitazon.poscoffee.repositories;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.digitazon.poscoffee.models.Order;

public interface OrdersRepository extends PagingAndSortingRepository<Order, Long>, JpaSpecificationExecutor<Order> {}
