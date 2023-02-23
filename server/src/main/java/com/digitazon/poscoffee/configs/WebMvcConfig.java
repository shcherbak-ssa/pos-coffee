package com.digitazon.poscoffee.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

import com.digitazon.poscoffee.middlewares.AuthMiddleware;
import com.digitazon.poscoffee.middlewares.LoggerMiddleware;
import com.digitazon.poscoffee.shared.constants.AppConstants;

@Configuration
public class WebMvcConfig extends WebMvcConfigurationSupport {

  @Override
  protected void addInterceptors(InterceptorRegistry registry) {
    super.addInterceptors(registry);

    registry.addInterceptor(new LoggerMiddleware());

    registry.addInterceptor(new AuthMiddleware())
      .excludePathPatterns(AppConstants.ApiEndpoint.AUTH_LOGIN);
  }

}
