package com.digitazon.poscoffee.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.digitazon.poscoffee.models.User;

public interface UsersRepository extends JpaRepository<User, Long> {

  public Optional<User> findByEmail(String email);

}
