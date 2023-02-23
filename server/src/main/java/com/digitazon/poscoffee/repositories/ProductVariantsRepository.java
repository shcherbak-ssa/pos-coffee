package com.digitazon.poscoffee.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.digitazon.poscoffee.models.Product;
import com.digitazon.poscoffee.models.ProductVariant;

public interface ProductVariantsRepository extends JpaRepository<ProductVariant, Long> {

  public boolean existsBySku(String sku);
  public List<ProductVariant> findAllByProduct(Product product);

}
