package com.digitazon.poscoffee.shared.annotations;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

import com.digitazon.poscoffee.shared.helpers.EqualToValidator;

@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = EqualToValidator.class)
@Documented
public @interface EqualTo {

  String message() default "Invalid value. Expected ";

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};

  String[] values() default {};

}
