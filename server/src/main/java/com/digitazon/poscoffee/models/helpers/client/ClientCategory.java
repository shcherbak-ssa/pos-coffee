package com.digitazon.poscoffee.models.helpers.client;

import java.util.Date;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.constants.CategoriesConstants;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClientCategory {

  @NotNull(
    message = AppConstants.ID_EMPTY_MESSAGE,
    groups = AppConstants.ValidationGroups.ToUpdate.class
  )
  private Long id;

  @NotBlank(
    message = CategoriesConstants.NAME_EMPTY_MESSAGE,
    groups = AppConstants.ValidationGroups.ToCreate.class
  )
  @Size(
    min = AppConstants.MIN_UPDATE_LENGTH,
    message = CategoriesConstants.NAME_EMPTY_MESSAGE,
    groups = AppConstants.ValidationGroups.ToUpdate.class
  )
  private String name;

  private Long productsCount;
  private Boolean isAvailable;
  private Boolean isArchived;
  private Date createdAt;
  private Date updatedAt;
  private Date archivedAt;

}
