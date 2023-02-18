package com.digitazon.poscoffee.configs;

import java.util.Date;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.Scope;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.digitazon.poscoffee.models.User;
import com.digitazon.poscoffee.models.UserType;
import com.digitazon.poscoffee.models.helpers.ClientUser;
import com.digitazon.poscoffee.models.helpers.ConfigUser;
import com.digitazon.poscoffee.models.helpers.ErrorResponse;
import com.digitazon.poscoffee.shared.constants.AppConstants;

@Configuration
@PropertySource(AppConstants.POSCOFFEE_PROPS_FILENAME)
public class AppConfig {

  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
  public ErrorResponse errorResponse() {
    return new ErrorResponse();
  }

  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON)
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
  public ClientUser clientUser(User user, boolean loadAddress) {
    final ClientUser clientUser = new ClientUser();

    clientUser.setId(user.getId());
    clientUser.setName(user.getName());
    clientUser.setSurname(user.getSurname());
    clientUser.setEmail(user.getEmail());
    clientUser.setPhone(user.getPhone());
    clientUser.setType(user.getType().getName().name());
    clientUser.setPhoto(user.getPhoto());
    clientUser.setIsArchived(user.getIsArchived());
    clientUser.setCreatedAt(user.getCreatedAt());
    clientUser.setUpdatedAt(user.getUpdatedAt());
    clientUser.setDeletedAt(user.getArchivedAt());

    if (loadAddress) {
      clientUser.setAddress(user.getAddress());
    }

    return clientUser;
  }

  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
  public User user(ClientUser clientUser, UserType userType) {
    final User user = new User();

    user.setId(clientUser.getId());
    user.setName(clientUser.getName());
    user.setSurname(clientUser.getSurname());
    user.setEmail(clientUser.getEmail());
    user.setPhone(clientUser.getPhone());
    user.setPhoto(clientUser.getPhoto());
    user.setAddress(clientUser.getAddress());
    user.setType(userType);

    return user;
  }

  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
  public User userFromConfigUser(ConfigUser configUser) {
    final User user = new User();

    user.setName(configUser.getName());
    user.setSurname(configUser.getSurname());
    user.setPhone(configUser.getPhone());
    user.setEmail(configUser.getEmail());
    user.setPassword(configUser.getPassword());
    user.setPhoto(configUser.getPhoto());
    user.setIsArchived(configUser.getIsArchived());

    if (configUser.getIsArchived()) {
      user.setArchivedAt(new Date());
    }

    return user;
  }

}
