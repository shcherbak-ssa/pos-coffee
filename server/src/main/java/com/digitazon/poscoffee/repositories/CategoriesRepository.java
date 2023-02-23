package com.digitazon.poscoffee.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.digitazon.poscoffee.models.Category;

public interface CategoriesRepository extends JpaRepository<Category, Long>, JpaSpecificationExecutor<Category>  {

  public boolean existsByName(String name);

}
