package com.digitazon.poscoffee.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.digitazon.poscoffee.modules.auth.AuthEntryPoint;
import com.digitazon.poscoffee.modules.auth.AuthTokenFilter;
import com.digitazon.poscoffee.modules.auth.AuthUserDetailsService;
import com.digitazon.poscoffee.shared.constants.AppConstants;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

  @Autowired
  private AuthUserDetailsService authUserDetailsService;

  @Autowired
  private AuthEntryPoint authEnityPoint;

  @Bean
  public AuthTokenFilter authTokenFilter() {
    return new AuthTokenFilter();
  }

  @Bean
  public DaoAuthenticationProvider authProvider() {
    DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

    authProvider.setUserDetailsService(this.authUserDetailsService);
    authProvider.setPasswordEncoder(new BCryptPasswordEncoder()); // @TODO: add context

    return authProvider;
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
    return authConfig.getAuthenticationManager();
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
    httpSecurity
      .cors().and().csrf().disable()
      .exceptionHandling().authenticationEntryPoint(this.authEnityPoint)
      .and()
      .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      .and()
      .authorizeRequests()
        .antMatchers(AppConstants.ApiEndpoint.AUTH_LOGIN).permitAll()
        .antMatchers(HttpMethod.GET, AppConstants.ApiEndpoint.USERS).permitAll()
        .anyRequest().authenticated();

    return httpSecurity
      .authenticationProvider(this.authProvider())
      .addFilterBefore(this.authTokenFilter(), UsernamePasswordAuthenticationFilter.class)
      .build();
  }

}
