package com.digitazon.poscoffee.shared.utils;

import java.util.Arrays;
import java.util.List;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.digitazon.poscoffee.shared.annotations.EqualTo;

public class EqualToValidator implements ConstraintValidator<EqualTo, String> {

  private List<String> values;
  private String message;

  @Override
  public void initialize(EqualTo annotation) {
    ConstraintValidator.super.initialize(annotation);

    final String[] values = annotation.values();
    final String message = annotation.message();

    this.message = message + " must be equal to " + Arrays.toString(values);
    this.values = Arrays.asList(values);
  }

  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    if (value == null) {
      return true;
    }

    final boolean isContains = this.values.contains(value.trim());

    if (!isContains) {
      context.disableDefaultConstraintViolation();

      context
        .buildConstraintViolationWithTemplate(this.message)
        .addConstraintViolation();
    }

    return isContains;
  }

}
