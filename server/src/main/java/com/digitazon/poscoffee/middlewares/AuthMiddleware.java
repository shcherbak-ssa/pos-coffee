package com.digitazon.poscoffee.middlewares;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.exceptions.UnauthorizedUserException;

@Component
public class AuthMiddleware implements HandlerInterceptor {

  @Override
  public boolean preHandle(
    HttpServletRequest request,
    HttpServletResponse response,
    Object handler
  )
    throws Exception
  {
    String principalUser = SecurityContextHolder
      .getContext()
      .getAuthentication()
      .getPrincipal()
      .toString();

    if (principalUser.equals(AppConstants.ANONYMOUS_USER)) {
      throw new UnauthorizedUserException();
    }

    return true;
  }

}
