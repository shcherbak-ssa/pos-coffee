package com.digitazon.poscoffee.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.constants.UsersConstants;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(
  name = AppConstants.DatabaseTable.USERS
  // uniqueConstraints = {
  //   @UniqueConstraint(columnNames = { "email" }),
  //   @UniqueConstraint(columnNames = { "username" })
  // }
)
@Data
@NoArgsConstructor
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(message = UsersConstants.NAME_EMPTY_MESSAGE)
  private String name;

  @NotBlank(message = UsersConstants.SURNAME_EMPTY_MESSAGE)
  private String surname;

  @NotBlank(message = UsersConstants.EMAIL_EMPTY_MESSAGE)
  @Email(message = UsersConstants.EMAIL_INVALID_MESSAGE)
  private String email;

  @NotBlank(message = UsersConstants.PHONE_EMPTY_MESSAGE)
  private String phone;

  @NotBlank(message = UsersConstants.USERNAME_EMPTY_MESSAGE)
  @Size(min = UsersConstants.MIN_USERNAME_LENGTH, message = UsersConstants.USERNAME_LENGTH_MESSAGE)
  private String username;

  @NotBlank(message = UsersConstants.PASSWORD_EMPTY_MESSAGE)
  @Size(min = UsersConstants.MIN_PASSWORD_LENGTH, message = UsersConstants.PASSWORD_LENGTH_MESSAGE)
  private String password;

  @ManyToOne
  @JoinTable(
    name = AppConstants.DatabaseTable.USER_TYPE_JOIN,
    joinColumns = @JoinColumn(name = "user_id"),
    inverseJoinColumns = @JoinColumn(name = "type_id")
  )
  private UserType type;

}
