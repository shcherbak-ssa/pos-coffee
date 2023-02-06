package com.digitazon.poscoffee.modules.auth;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class AuthTokenFilter extends OncePerRequestFilter {

  @Autowired
  private AuthJwtUtils authJwtUtils;

  @Autowired
  private AuthUserDetailsService authUserDetailsService;

  @Override
  protected void doFilterInternal(
    HttpServletRequest request,
    HttpServletResponse response,
    FilterChain filterChain
  )
    throws ServletException, IOException
  {
    try {
      final String authToken = this.authJwtUtils.getAuthToken(request);

      if (authToken != null && this.authJwtUtils.validateAuthToken(authToken)) {
        final String username = this.authJwtUtils.getUsernameFromAuthToken(authToken);
        final UserDetails userDetails = this.authUserDetailsService.loadUserByUsername(username);

        System.out.println();
        System.out.println(userDetails.toString());
        System.out.println();

        final UsernamePasswordAuthenticationToken authentication =
          new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

        System.out.println();
        System.out.println(authentication.toString());
        System.out.println();

        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authentication);
      }
    } catch (Exception e) {
      AuthTokenFilter.log.error("Cannot set user authentication: {}", e);
    }

    filterChain.doFilter(request, response);
  }

}
