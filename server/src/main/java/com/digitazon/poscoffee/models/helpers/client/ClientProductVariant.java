package com.digitazon.poscoffee.models.helpers.client;

import java.util.Date;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.constants.ProductVariantsConstants;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClientProductVariant {

  @NotNull(
    message = AppConstants.ID_EMPTY_MESSAGE,
    groups = AppConstants.ValidationGroups.ToUpdate.class
  )
  private Long id;

  @NotBlank(
    message = ProductVariantsConstants.SKU_EMPTY_MESSAGE,
    groups = AppConstants.ValidationGroups.ToCreate.class
  )
  @Size(
    min = AppConstants.MIN_UPDATE_LENGTH,
    message = ProductVariantsConstants.SKU_EMPTY_MESSAGE
  )
  private String sku;

  @NotBlank(
    message = ProductVariantsConstants.NAME_EMPTY_MESSAGE,
    groups = AppConstants.ValidationGroups.ToCreate.class
  )
  @Size(
    min = AppConstants.MIN_UPDATE_LENGTH,
    message = ProductVariantsConstants.NAME_EMPTY_MESSAGE,
    groups = AppConstants.ValidationGroups.ToUpdate.class
  )
  private String name;

  private Float price;
  private Integer stock;
  private Integer stockPerTime;
  private Integer stockAlert;
  private Boolean useProductPrice;
  private Date createdAt;
  private Date updatedAt;

}
