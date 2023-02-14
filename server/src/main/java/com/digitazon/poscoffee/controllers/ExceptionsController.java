package com.digitazon.poscoffee.controllers;

import java.nio.file.AccessDeniedException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.digitazon.poscoffee.models.helpers.ErrorResponse;
import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.exceptions.ResourceNotFoundException;
import com.digitazon.poscoffee.shared.exceptions.UnauthorizedUserException;

@ControllerAdvice
public class ExceptionsController {

  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<ErrorResponse> handleResourceNotFoundException(ResourceNotFoundException exception) {
    final ErrorResponse errorResponse = new ErrorResponse(); // @TODO: add context
    errorResponse.setMessage(exception.getMessage());

    return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException exception) {
    Map<String, String> errors = new HashMap<>();

    exception.getBindingResult().getFieldErrors().forEach((error) -> {
      errors.put(error.getField(), error.getDefaultMessage());
    });

    final ErrorResponse errorResponse = new ErrorResponse(); // @TODO: add context
    errorResponse.setType(AppConstants.ErrorType.VALIDATION.name());
    errorResponse.setMessage(AppConstants.VALIDATION_ERROR_MESSAGE);
    errorResponse.setErrors(errors);

    return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(BadCredentialsException.class)
  public ResponseEntity<ErrorResponse> handleBadCredentialsException(BadCredentialsException exception) {
    final ErrorResponse errorResponse = new ErrorResponse(); // @TODO: add context
    errorResponse.setType(AppConstants.ErrorType.CLIENT.name());
    errorResponse.setMessage(AppConstants.BAD_CREDENTIALS_MESSAGE);

    return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(UnauthorizedUserException.class)
  public ResponseEntity<ErrorResponse> handleUnauthorizedUserException(UnauthorizedUserException exception) {
    final ErrorResponse errorResponse = new ErrorResponse(); // @TODO: add context
    errorResponse.setType(AppConstants.ErrorType.AUTH.name());
    errorResponse.setMessage(exception.getMessage());

    return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.UNAUTHORIZED);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorResponse> handleException(Exception exception) {
    final ErrorResponse errorResponse = new ErrorResponse(); // @TODO: add context
    String message = exception.getMessage();
    HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception.getClass().getName().endsWith(AppConstants.ACCESS_DENIED_ERROR)) {
      message = AppConstants.ACCESS_DENY_MESSAGE;
      status = HttpStatus.FORBIDDEN;
    }

    errorResponse.setMessage(message);

    return new ResponseEntity<ErrorResponse>(errorResponse, status);
  }

}
