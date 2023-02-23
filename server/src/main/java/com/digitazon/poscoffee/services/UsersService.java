package com.digitazon.poscoffee.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.digitazon.poscoffee.configs.AppConfig;
import com.digitazon.poscoffee.models.User;
import com.digitazon.poscoffee.models.UserType;
import com.digitazon.poscoffee.models.helpers.ClientUser;
import com.digitazon.poscoffee.models.helpers.EntityFilter;
import com.digitazon.poscoffee.repositories.UsersRepository;
import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.constants.UsersConstants;
import com.digitazon.poscoffee.shared.exceptions.AlreadyExistException;
import com.digitazon.poscoffee.shared.exceptions.ProgerException;
import com.digitazon.poscoffee.shared.exceptions.ResourceNotFoundException;
import com.digitazon.poscoffee.shared.helpers.Helpers;
import com.digitazon.poscoffee.shared.helpers.ServiceHelpers;

@Service
public class UsersService {

  // @TODO: conver to annotation
  private AnnotationConfigApplicationContext context
    = new AnnotationConfigApplicationContext(AppConfig.class);

  @Autowired
  private UserTypesService userTypesService;

  @Autowired
  private PasswordEncoder encoder;

  private UsersRepository repository;
  private ServiceHelpers<User> helpers;

  @SuppressWarnings("unchecked")
  public UsersService(@Autowired UsersRepository repository) {
    this.repository = repository;
    this.helpers = (ServiceHelpers<User>)
      this.context.getBean("serviceHelpers", repository, AppConstants.Entity.USER);
  }

  public boolean isUserExist(String email) {
    return this.repository.existsByEmail(email);
  }

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
      return this.convertToClientUser(foundUser.get(), true);
    }

    throw new ResourceNotFoundException("User not found");
  }

  public List<ClientUser> getUsers(EntityFilter filter) {
    final List<User> users = this.repository.findAll(UsersService.filter(filter));

    return users
      .stream()
      .map((user) -> this.convertToClientUser(user, false))
      .collect(Collectors.toList());
  }

  public ClientUser createUser(ClientUser userToCreate) throws ProgerException, AlreadyExistException {
    final User user = this.convertToUser(userToCreate);
    final String password = Helpers.generatePassword();
    user.setPassword(password);

    final User createdUser = this.createUser(user);
    // @TODO: add email notification

    return this.convertToClientUser(createdUser, true);
  }

  public User createUser(User userToCreate) throws AlreadyExistException {
    this.checkIfUserExists(userToCreate.getEmail());

    String password = userToCreate.getPassword();
    password = this.encoder.encode(password);

    userToCreate.setPassword(password);

    return this.repository.save(userToCreate);
  }

  public void updateUser(ClientUser updates) throws AlreadyExistException, ResourceNotFoundException {
    this.checkIfUserExists(updates.getEmail());

    this.helpers.update(
      updates.getId(),
      (User user) -> this.mergeWithUpdates(user, updates)
    );
  }

  public void archiveUserById(Long id) throws ResourceNotFoundException {
    this.helpers.archiveById(id);
  }

  public void restoreUserById(Long id) throws ResourceNotFoundException {
    this.helpers.restoreById(id);
  }

  private void checkIfUserExists(String email) throws AlreadyExistException {
    if (email != null && this.isUserExist(email)) {
      throw new AlreadyExistException(UsersConstants.UNIQUE_FIELD, UsersConstants.ALREADY_EXIST_MESSAGE);
    }
  }

  private ClientUser convertToClientUser(User user, boolean loadAddress) {
    return (ClientUser) this.context.getBean("clientUser", user, loadAddress);
  }

  private User convertToUser(ClientUser user) throws ProgerException {
    final UserType userType
      = Helpers.converUserTypeToEnumValue(this.userTypesService, user.getType());

    return (User) this.context.getBean("user", user, userType);
  }

  private void mergeWithUpdates(User user, ClientUser updates) {
    user.setName(updates.getName() == null ? user.getName() : updates.getName());
    user.setSurname(updates.getSurname() == null ? user.getSurname() : updates.getSurname());
    user.setEmail(updates.getEmail() == null ? user.getEmail() : updates.getEmail());
    user.setPhone(updates.getPhone() == null ? user.getPhone() : updates.getPhone());
  }

  private static Specification<User> filter(EntityFilter filter) {
    return new Specification<User>() {

      @Override
      public Predicate toPredicate(Root<User> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        final Path<User> isArchivedPath = root.get("isArchived");
        final Boolean onlyArchived = filter.getOnlyArchived();

        if (onlyArchived != null && onlyArchived) {
          return builder.equal(isArchivedPath, true);
        }

        return builder.or(
          builder.isNull(isArchivedPath),
          builder.equal(isArchivedPath, false)
        );
      }

    };
  }

}
