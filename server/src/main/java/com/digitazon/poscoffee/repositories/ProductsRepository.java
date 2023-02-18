package com.digitazon.poscoffee.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.digitazon.poscoffee.models.Product;

public interface ProductsRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

  public boolean existsBySku(String sku);

}
