package com.digitazon.poscoffee.models;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.digitazon.poscoffee.models.base.BaseEntity;
import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.constants.UsersConstants;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = AppConstants.DatabaseTable.USERS)
@EntityListeners(AuditingEntityListener.class)
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class User extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(
    message = UsersConstants.NAME_EMPTY_MESSAGE,
    groups = AppConstants.ValidationGroups.ToCreate.class
  )
  @Size(
    min = AppConstants.MIN_UPDATE_LENGTH,
    message = UsersConstants.NAME_EMPTY_MESSAGE,
    groups = AppConstants.ValidationGroups.ToUpdate.class
  )
  private String name;

  @NotBlank(
    message = UsersConstants.SURNAME_EMPTY_MESSAGE,
    groups = AppConstants.ValidationGroups.ToCreate.class
  )
  @Size(
    min = AppConstants.MIN_UPDATE_LENGTH,
    message = UsersConstants.SURNAME_EMPTY_MESSAGE,
    groups = AppConstants.ValidationGroups.ToUpdate.class
  )
  private String surname;

  @NotBlank(
    message = UsersConstants.EMAIL_EMPTY_MESSAGE,
    groups = AppConstants.ValidationGroups.ToCreate.class
  )
  @Email(message = UsersConstants.EMAIL_INVALID_MESSAGE)
  private String email;

  @NotBlank(
    message = UsersConstants.PHONE_EMPTY_MESSAGE,
    groups = AppConstants.ValidationGroups.ToCreate.class
  )
  @Size(
    min = AppConstants.MIN_UPDATE_LENGTH,
    message = UsersConstants.PHONE_EMPTY_MESSAGE,
    groups = AppConstants.ValidationGroups.ToUpdate.class
  )
  @Pattern(
    regexp = UsersConstants.PHONE_PATTERN,
    message = UsersConstants.PHONE_PATTER_MESSAGE
  )
  private String phone;

  @NotBlank(message = UsersConstants.PASSWORD_EMPTY_MESSAGE)
  @Size(
    min = UsersConstants.MIN_PASSWORD_LENGTH,
    message = UsersConstants.PASSWORD_LENGTH_MESSAGE
  )
  private String password;

  @ManyToOne
  @JoinTable(
    name = AppConstants.DatabaseTable.USER_TYPE_JOIN,
    joinColumns = @JoinColumn(name = "user_id"),
    inverseJoinColumns = @JoinColumn(name = "type_id")
  )
  @NotNull(
    message = UsersConstants.TYPE_EMPTY_MESSAGE,
    groups = AppConstants.ValidationGroups.ToCreate.class
  )
  @Null(
    message = UsersConstants.CANNOT_CHANGE_TYPE_MESSAGE,
    groups = AppConstants.ValidationGroups.ToUpdate.class
  )
  private UserType type;

  private String image;

  @OneToOne(fetch = FetchType.EAGER)
  private Address address;

}
