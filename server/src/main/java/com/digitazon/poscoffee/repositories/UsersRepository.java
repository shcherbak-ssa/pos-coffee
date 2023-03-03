package com.digitazon.poscoffee.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.digitazon.poscoffee.models.User;

public interface UsersRepository extends PagingAndSortingRepository<User, Long>, JpaSpecificationExecutor<User> {

  public boolean existsByEmail(String email);
  public Optional<User> findByEmail(String email);

  @Query("SELECT u FROM User AS u WHERE u.name LIKE %:searchString% OR u.surname LIKE %:searchString% OR u.email LIKE %:searchString%")
  public List<User> search(@Param("searchString") String searchString);

}
