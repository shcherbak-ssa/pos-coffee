package com.digitazon.poscoffee.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitazon.poscoffee.models.UserType;
import com.digitazon.poscoffee.repositories.UserTypesRepository;
import com.digitazon.poscoffee.shared.constants.UsersConstants;

@Service
public class UserTypesService {

  @Autowired
  private UserTypesRepository repository;

  public void loadTypes() {
    for (UsersConstants.UserType type : UsersConstants.UserType.values()) {
      UserType userType = new UserType();
      userType.setName(type);

      this.repository.save(userType);
    }
  }

  public UserType getByName(UsersConstants.UserType name) {
    return this.repository.findByName(name);
  }

}
