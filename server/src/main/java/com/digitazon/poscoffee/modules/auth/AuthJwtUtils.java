package com.digitazon.poscoffee.modules.auth;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.digitazon.poscoffee.shared.constants.AppConstants;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class AuthJwtUtils {

  @Value("${poscoffee.jwt.secretKey}")
  private String secretKey;

  @Value("${poscoffee.jwt.expired}")
  private int expired;

  public String generateAuthToken(Authentication authentication) {
    final UserDetails userPrincipal = (UserDetails) authentication.getPrincipal();

    return Jwts.builder()
      .setSubject((userPrincipal.getUsername()))
      .setIssuedAt(new Date())
      .setExpiration(new Date((new Date()).getTime() + this.expired))
      .signWith(SignatureAlgorithm.HS512, this.secretKey)
      .compact();
  }

  public String getUsernameFromAuthToken(String authToken) {
    return Jwts.parser()
      .setSigningKey(this.secretKey)
      .parseClaimsJws(authToken)
      .getBody()
      .getSubject();
  }

  public String getAuthToken(HttpServletRequest request) {
    final String authHeader = request.getHeader(AppConstants.AUTHORIZATION_HEADER);

    if (
      authHeader != null &&
      !authHeader.isEmpty() &&
      authHeader.startsWith(AppConstants.AUTHORIZATION_TYPE)
    ) {
      return authHeader.split(AppConstants.AUTHORIZATION_DIVIDER)[1];
    }

    return null;
  }

  public boolean validateAuthToken(String authToken) {
    try {
      Jwts.parser()
        .setSigningKey(this.secretKey)
        .parseClaimsJws(authToken);

      return true;
    } catch (Exception e) {
      log.error(e.getMessage());
    }

    return false;
  }

}
