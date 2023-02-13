package com.digitazon.poscoffee.shared.utils;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.stereotype.Component;

import com.digitazon.poscoffee.configs.AppConfig;
import com.digitazon.poscoffee.models.User;
import com.digitazon.poscoffee.models.UserType;
import com.digitazon.poscoffee.models.helpers.ConfigUser;
import com.digitazon.poscoffee.services.UserTypesService;
import com.digitazon.poscoffee.services.UsersService;
import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.constants.UsersConstants;
import com.digitazon.poscoffee.shared.exceptions.ProgerException;

@Component
public class DatabaseDataLoader {

  // @TODO: conver to annotation
  private AnnotationConfigApplicationContext context
    = new AnnotationConfigApplicationContext(AppConfig.class);

  @Autowired
  private UsersService usersService;

  @Autowired
  private UserTypesService userTypesService;

  public void loadConstants() {
    this.userTypesService.loadTypes();
  }

  public void loadUsers(List<ConfigUser> users) throws ProgerException {
    for (ConfigUser configUser : users) {
      final User user = (User) this.context.getBean("userFromConfigUser", configUser);
      final UserType userType = this.getUserTypeFromUserConfig(configUser);

      user.setType(userType);

      this.usersService.createUser(user);
    }
  }

  private UserType getUserTypeFromUserConfig(ConfigUser user) throws ProgerException {
    UsersConstants.UserType userType = null;

    switch (user.getType()) {
      case AppConstants.ConfigUserType.ADMIN:
        userType = UsersConstants.UserType.ADMIN;
        break;
      case AppConstants.ConfigUserType.MANAGER:
        userType = UsersConstants.UserType.MANAGER;
        break;
      case AppConstants.ConfigUserType.WAITER:
        userType = UsersConstants.UserType.WAITER;
        break;
    }

    if (userType == null) {
      throw new ProgerException(String.format("Unknown user type %s from config", user.getType()));
    }

    return this.userTypesService.getByName(userType);
  }

}
