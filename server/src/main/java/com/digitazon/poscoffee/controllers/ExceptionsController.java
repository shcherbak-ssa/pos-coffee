package com.digitazon.poscoffee.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.digitazon.poscoffee.models.helpers.ErrorResponse;
import com.digitazon.poscoffee.shared.exceptions.ResourceNotFoundException;

@ControllerAdvice
public class ExceptionsController {

  private static final String VALIDATION_ERROR_MESSAGE = "Validation error";

  @ExceptionHandler(value = ResourceNotFoundException.class)
  public ResponseEntity<ErrorResponse> handleResourceNotFoundException(ResourceNotFoundException exception) {
    final ErrorResponse errorResponse = new ErrorResponse(); // @TODO: add context
    errorResponse.setMessage(exception.getMessage());

    return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(value = MethodArgumentNotValidException.class)
  public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException exception) {
    Map<String, String> errors = new HashMap<>();

    exception.getBindingResult().getFieldErrors().forEach((error) -> {
      errors.put(error.getField(), error.getDefaultMessage());
    });

    final ErrorResponse errorResponse = new ErrorResponse(); // @TODO: add context
    errorResponse.setMessage(ExceptionsController.VALIDATION_ERROR_MESSAGE);
    errorResponse.setErrors(errors);

    return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(value = Exception.class)
  public ResponseEntity<ErrorResponse> handleException(Exception exception) {
    final ErrorResponse errorResponse = new ErrorResponse(); // @TODO: add context
    errorResponse.setMessage(exception.getMessage());

    return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
  }

}
