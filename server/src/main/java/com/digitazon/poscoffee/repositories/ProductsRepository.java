package com.digitazon.poscoffee.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.digitazon.poscoffee.models.Category;
import com.digitazon.poscoffee.models.Product;

public interface ProductsRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

  public boolean existsBySku(String sku);
  public long countByCategory(Category category);
  public List<Product> findAllByCategory(Category category);

}
