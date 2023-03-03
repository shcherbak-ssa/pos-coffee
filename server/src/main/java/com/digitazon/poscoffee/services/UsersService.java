package com.digitazon.poscoffee.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.digitazon.poscoffee.configs.AppConfig;
import com.digitazon.poscoffee.models.User;
import com.digitazon.poscoffee.models.constants.UserType;
import com.digitazon.poscoffee.models.helpers.PageResponse;
import com.digitazon.poscoffee.models.helpers.client.ClientUser;
import com.digitazon.poscoffee.models.helpers.filters.UsersFilter;
import com.digitazon.poscoffee.repositories.UsersRepository;
import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.constants.UsersConstants;
import com.digitazon.poscoffee.shared.exceptions.AlreadyExistException;
import com.digitazon.poscoffee.shared.exceptions.ResourceNotFoundException;
import com.digitazon.poscoffee.shared.helpers.Helpers;
import com.digitazon.poscoffee.shared.types.BaseServiceHelpers;

@Service
public class UsersService {

  // @TODO: conver to annotation
  private AnnotationConfigApplicationContext context
    = new AnnotationConfigApplicationContext(AppConfig.class);

  @PersistenceContext
  private EntityManager manager;

  @Autowired
  private UserTypesService userTypesService;

  @Autowired
  private PasswordEncoder encoder;

  @Autowired
  private UsersRepository repository;

  private BaseServiceHelpers helpers;

  public UsersService() {
    this.helpers = (BaseServiceHelpers) this.context.getBean("serviceHelpers", AppConstants.Entity.USER);
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

  public List<ClientUser> getUsers(UsersFilter filter) {
    final List<User> users = this.repository.findAll(UsersService.filter(filter, this.userTypesService));

    return users
      .stream()
      .map((user) -> this.convertToClientUser(user, false))
      .collect(Collectors.toList());
  }

  public PageResponse<ClientUser> getUsersByPage(UsersFilter filter) {
    final Page<User> usersPage = this.repository.findAll(
      UsersService.filter(filter, this.userTypesService),
      PageRequest.of(filter.getPage(), filter.getPageSize())
    );

    if (usersPage.hasContent()) {
      return this.convertToPageResponse(usersPage, usersPage.getContent());
    }

    return this.convertToPageResponse(usersPage, new ArrayList<User>());
  }

  public List<ClientUser> searchUsers(String searchString) {
    final List<User> users = this.repository.search(searchString);

    return users
      .stream()
      .map((user) -> this.convertToClientUser(user, false))
      .collect(Collectors.toList());
  }

  public ClientUser createUser(ClientUser userToCreate) throws AlreadyExistException {
    final User user = this.convertToUser(userToCreate);
    final String password = Helpers.generatePassword();
    user.setPassword(password);

    final User createdUser = this.createUser(user);

    return this.convertToClientUser(createdUser, true);
  }

  public User createUser(User userToCreate) throws AlreadyExistException {
    this.checkIfUserExists(userToCreate.getEmail());

    String password = userToCreate.getPassword();
    password = this.encoder.encode(password);

    userToCreate.setPassword(password);
    userToCreate.setIsArchived(false);

    return this.repository.save(userToCreate);
  }

  public void updateUser(ClientUser updates) throws AlreadyExistException, ResourceNotFoundException {
    this.checkIfUserExists(updates.getEmail());

    this.helpers.update(
      updates.getId(),
      this.repository,
      (User user) -> this.mergeWithUpdates(user, updates)
    );
  }

  public void archiveUserById(Long id) throws ResourceNotFoundException {
    this.helpers.archiveById(id, this.repository);
  }

  public void restoreUserById(Long id) throws ResourceNotFoundException {
    this.helpers.restoreById(id, this.repository);
  }

  private void checkIfUserExists(String email) throws AlreadyExistException {
    if (email != null && this.isUserExist(email)) {
      throw new AlreadyExistException(UsersConstants.UNIQUE_FIELD, UsersConstants.ALREADY_EXIST_MESSAGE);
    }
  }

  private ClientUser convertToClientUser(User user, boolean loadAddress) {
    return (ClientUser) this.context.getBean("clientUser", user, loadAddress);
  }

  private User convertToUser(ClientUser user) {
    final UserType userType = this.userTypesService.getByName(user.getType());

    return (User) this.context.getBean("user", user, userType);
  }

  private PageResponse<ClientUser> convertToPageResponse(Page<User> page, List<User> users) {
    final List<ClientUser> clientUsers = users
      .stream()
      .map((user) -> this.convertToClientUser(user, false))
      .collect(Collectors.toList());

    return (PageResponse<ClientUser>) this.context.getBean("pageResponse", page, clientUsers);
  }

  private void mergeWithUpdates(User user, ClientUser updates) {
    user.setName(updates.getName() == null ? user.getName() : updates.getName());
    user.setSurname(updates.getSurname() == null ? user.getSurname() : updates.getSurname());
    user.setEmail(updates.getEmail() == null ? user.getEmail() : updates.getEmail());
    user.setPhone(updates.getPhone() == null ? user.getPhone() : updates.getPhone());
  }

  private static Specification<User> filter(UsersFilter filter, UserTypesService userTypesService) {
    return new Specification<User>() {

      @Override
      public Predicate toPredicate(Root<User> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        final List<Predicate> predicates = new ArrayList<Predicate>();

        if (filter.getIsArchived() != null) {
          predicates.add(
            builder.equal(root.get("isArchived"), filter.getIsArchived())
          );
        }

        if (filter.getForApp()) {
          final UserType type = userTypesService.getByName(UsersConstants.UserType.WAITER);

          predicates.add(
            builder.and(
              builder.equal(root.get("isArchived"), false),
              builder.equal(root.get("type"), type)
            )
          );
        }

        return builder.and(predicates.toArray(new Predicate[0]));
      }

    };
  }

}
