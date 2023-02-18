package com.digitazon.poscoffee.models.helpers;

import java.util.Date;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.digitazon.poscoffee.models.Address;
import com.digitazon.poscoffee.shared.annotations.EqualTo;
import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.constants.UsersConstants;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClientUser {

  @NotNull(
    message = UsersConstants.ID_EMPTY_MESSAGE,
    groups = AppConstants.ValidationGroups.ToUpdate.class
  )
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

  @NotNull(
    message = UsersConstants.TYPE_EMPTY_MESSAGE,
    groups = AppConstants.ValidationGroups.ToCreate.class
  )
  @Null(
    message = UsersConstants.CANNOT_CHANGE_TYPE_MESSAGE,
    groups = AppConstants.ValidationGroups.ToUpdate.class
  )
  @EqualTo(
    message = "User type",
    values = {
      UsersConstants.ConfigUserType.ADMIN,
      UsersConstants.ConfigUserType.MANAGER,
      UsersConstants.ConfigUserType.WAITER
    }
  )
  private String type;

  private String photo;
  private Address address;
  private Boolean isArchived;
  private Date createdAt;
  private Date updatedAt;
  private Date deletedAt;

}
