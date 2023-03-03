package com.digitazon.poscoffee.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.digitazon.poscoffee.models.Category;

public interface CategoriesRepository extends JpaRepository<Category, Long>, JpaSpecificationExecutor<Category>  {

  public boolean existsByName(String name);

  @Query("SELECT c FROM Category AS c WHERE c.name LIKE %:searchString%")
  public List<Category> search(@Param("searchString") String searchString);

}
