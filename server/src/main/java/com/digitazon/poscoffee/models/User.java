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

import com.digitazon.poscoffee.shared.constants.DatabaseConstants;
import com.digitazon.poscoffee.shared.constants.UsersConstants;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(
  name = DatabaseConstants.Table.USERS,
  uniqueConstraints = {
    @UniqueConstraint(columnNames = { "email" }),
    @UniqueConstraint(columnNames = { "username" })
  }
)
@Data
@NoArgsConstructor
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  private String name;

  @NotBlank
  private String surname;

  @NotBlank
  @Size(min = UsersConstants.MIN_USERNAME_LENGTH)
  private String username;

  @NotBlank
  @Email
  private String email;

  @NotBlank
  @Size(min = UsersConstants.MIN_PASSWORD_LENGTH)
  private String password;

  @ManyToOne
  @JoinTable(
    name = DatabaseConstants.Table.USER_TYPE_JOIN,
    joinColumns = @JoinColumn(name = "user_id"),
    inverseJoinColumns = @JoinColumn(name = "type_id")
  )
  private UserType type;

}
