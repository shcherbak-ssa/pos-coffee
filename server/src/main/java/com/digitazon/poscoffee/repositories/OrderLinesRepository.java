package com.digitazon.poscoffee.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.digitazon.poscoffee.models.OrderLine;

public interface OrderLinesRepository extends JpaRepository<OrderLine, Long> {}
