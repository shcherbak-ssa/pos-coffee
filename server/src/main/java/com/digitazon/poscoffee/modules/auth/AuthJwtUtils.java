package com.digitazon.poscoffee.modules.auth;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.digitazon.poscoffee.shared.constants.AppConstants;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
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
    } catch (SignatureException e) {
      AuthJwtUtils.log.error("Invalid JWT signature: {}", e.getMessage());
    } catch (MalformedJwtException e) {
      AuthJwtUtils.log.error("Invalid JWT token: {}", e.getMessage());
    } catch (ExpiredJwtException e) {
      AuthJwtUtils.log.error("JWT token is expired: {}", e.getMessage());
    } catch (UnsupportedJwtException e) {
      AuthJwtUtils.log.error("JWT token is unsupported: {}", e.getMessage());
    } catch (IllegalArgumentException e) {
      AuthJwtUtils.log.error("JWT claims string is empty: {}", e.getMessage());
    }

    return false;
  }

}
