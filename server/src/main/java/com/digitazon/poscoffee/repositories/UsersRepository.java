package com.digitazon.poscoffee.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.digitazon.poscoffee.models.User;

public interface UsersRepository extends PagingAndSortingRepository<User, Long>, JpaSpecificationExecutor<User> {

  public boolean existsByEmail(String email);
  public Optional<User> findByEmail(String email);

}
