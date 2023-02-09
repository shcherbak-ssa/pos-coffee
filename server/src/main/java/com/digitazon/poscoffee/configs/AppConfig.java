package com.digitazon.poscoffee.configs;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.Scope;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.digitazon.poscoffee.models.User;
import com.digitazon.poscoffee.models.helpers.ClientUser;
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
  public ClientUser clientUser(User user) {
    final ClientUser clientUser = new ClientUser();

    clientUser.setId(user.getId());
    clientUser.setName(user.getName());
    clientUser.setSurname(user.getSurname());
    clientUser.setEmail(user.getEmail());
    clientUser.setUsername(user.getUsername());
    clientUser.setType(user.getType().getName().name());

    return clientUser;
  }

}
