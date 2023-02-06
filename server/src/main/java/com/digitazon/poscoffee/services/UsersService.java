package com.digitazon.poscoffee.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.digitazon.poscoffee.models.User;
import com.digitazon.poscoffee.repositories.UsersRepository;
import com.digitazon.poscoffee.shared.exceptions.ResourceNotFoundException;

@Service
public class UsersService {

  @Autowired
  private UsersRepository repository;

  @Autowired
  private PasswordEncoder encoder;

  public User findByUsername(String username) throws ResourceNotFoundException {
    Optional<User> foundUser = this.repository.findByUsername(username);

    if (foundUser.isPresent()) {
      return foundUser.get();
    }

    throw new ResourceNotFoundException(String.format("User with username {} not found", username));
  }

  public User createUser(User userToCreate) {
    String password = userToCreate.getPassword();
    password = this.encoder.encode(password);

    userToCreate.setPassword(password);

    return this.repository.save(userToCreate);
  }

}
