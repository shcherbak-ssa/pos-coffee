package com.digitazon.poscoffee.middlewares;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class LoggerMiddleware implements HandlerInterceptor {

  @Override
  public boolean preHandle(
    HttpServletRequest request,
    HttpServletResponse response,
    Object handler
  )
    throws Exception
  {
    log.info(
      "{} {}",
      request.getMethod(),
      request.getRequestURL()
    );

    return true;
  }

}
