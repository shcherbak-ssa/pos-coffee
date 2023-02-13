package com.digitazon.poscoffee.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.digitazon.poscoffee.configs.AppConfig;
import com.digitazon.poscoffee.models.User;
import com.digitazon.poscoffee.models.helpers.ClientUser;
import com.digitazon.poscoffee.repositories.UsersRepository;
import com.digitazon.poscoffee.shared.exceptions.ResourceNotFoundException;

@Service
public class UsersService {

  // @TODO: conver to annotation
  private AnnotationConfigApplicationContext context
    = new AnnotationConfigApplicationContext(AppConfig.class);

  @Autowired
  private UsersRepository repository;

  @Autowired
  private PasswordEncoder encoder;

  public User findByEmail(String email) throws ResourceNotFoundException {
    final Optional<User> foundUser = this.repository.findByEmail(email);

    if (foundUser.isPresent()) {
      return foundUser.get();
    }

    throw new ResourceNotFoundException(String.format("User with email %s not found", email));
  }

  public ClientUser findUserById(Long id) throws ResourceNotFoundException {
    final Optional<User> foundUser = this.repository.findById(id);

    if (foundUser.isPresent()) {
      return this.convertToClientUser(foundUser.get());
    }

    throw new ResourceNotFoundException("User not found");
  }

  public List<ClientUser> getUsers() {
    final List<User> users = this.repository.findAll();

    return users
      .stream()
      .map(this::convertToClientUser)
      .collect(Collectors.toList());
  }

  public User createUser(User userToCreate) {
    String password = userToCreate.getPassword();
    password = this.encoder.encode(password);

    userToCreate.setPassword(password);

    return this.repository.save(userToCreate);
  }

  private ClientUser convertToClientUser(User user) {
    return (ClientUser) this.context.getBean("clientUser", user);
  }

}
