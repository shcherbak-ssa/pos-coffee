package com.digitazon.poscoffee.shared.utils;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.stereotype.Component;

import com.digitazon.poscoffee.configs.AppConfig;
import com.digitazon.poscoffee.models.Address;
import com.digitazon.poscoffee.models.User;
import com.digitazon.poscoffee.models.UserType;
import com.digitazon.poscoffee.models.helpers.ConfigUser;
import com.digitazon.poscoffee.services.AddressService;
import com.digitazon.poscoffee.services.UserTypesService;
import com.digitazon.poscoffee.services.UsersService;
import com.digitazon.poscoffee.shared.exceptions.AlreadyExistException;
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

  @Autowired AddressService addressService;

  public void loadConstants() {
    this.userTypesService.loadTypes();
  }

  public void loadUsers(List<ConfigUser> users) throws ProgerException, AlreadyExistException {
    for (ConfigUser configUser : users) {
      final User user = (User) this.context.getBean("userFromConfigUser", configUser);

      final UserType userType = Helpers.converUserTypeToEnumValue(this.userTypesService, configUser.getType());
      user.setType(userType);

      final Address address = this.addressService.createAddress(configUser.getAddress());
      user.setAddress(address);

      this.usersService.createUser(user);
    }
  }

}
