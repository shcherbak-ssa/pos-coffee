package com.digitazon.poscoffee.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.digitazon.poscoffee.models.constants.UserType;
import com.digitazon.poscoffee.shared.constants.UsersConstants;

public interface UserTypesRepository extends JpaRepository<UserType, Long> {

  public UserType findByName(UsersConstants.UserType name);

}
