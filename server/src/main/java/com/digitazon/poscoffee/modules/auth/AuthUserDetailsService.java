package com.digitazon.poscoffee.modules.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.digitazon.poscoffee.models.User;
import com.digitazon.poscoffee.services.UsersService;
import com.digitazon.poscoffee.shared.exceptions.ResourceNotFoundException;

@Service
public class AuthUserDetailsService implements UserDetailsService {

  @Autowired
  private UsersService usersService;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    try {
      User user = this.usersService.findByUsername(username);

      return AuthUserDetails.build(user);
    } catch (ResourceNotFoundException exception) {
      throw new UsernameNotFoundException(exception.getMessage());
    }
  }

}
