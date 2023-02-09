package com.digitazon.poscoffee.shared.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.digitazon.poscoffee.models.User;
import com.digitazon.poscoffee.models.UserType;
import com.digitazon.poscoffee.services.UserTypesService;
import com.digitazon.poscoffee.services.UsersService;
import com.digitazon.poscoffee.shared.constants.UsersConstants;

@Component
public class DatabaseDataLoader {

  @Autowired
  private UsersService usersService;

  @Autowired
  private UserTypesService userTypesService;

  public void loadConstants() {
    this.userTypesService.loadTypes();
  }

  public void loadAdmin(User adminUser) {
    UserType adminType = this.userTypesService.getByName(UsersConstants.UserType.ADMIN);
    adminUser.setType(adminType);

    this.usersService.createUser(adminUser);
  }

}
