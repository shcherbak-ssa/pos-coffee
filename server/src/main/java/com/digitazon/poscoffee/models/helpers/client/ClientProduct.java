package com.digitazon.poscoffee.models.helpers.client;

import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.constants.ProductsConstants;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClientProduct {

  @NotNull(
    message = AppConstants.ID_EMPTY_MESSAGE,
    groups = AppConstants.ValidationGroups.ToUpdate.class
  )
  private Long id;

  @NotBlank(
    message = ProductsConstants.SKU_EMPTY_MESSAGE,
    groups = AppConstants.ValidationGroups.ToCreate.class
  )
  @Size(
    min = AppConstants.MIN_UPDATE_LENGTH,
    message = ProductsConstants.SKU_EMPTY_MESSAGE
  )
  private String sku;

  @NotBlank(
    message = ProductsConstants.NAME_EMPTY_MESSAGE,
    groups = AppConstants.ValidationGroups.ToCreate.class
  )
  @Size(
    min = AppConstants.MIN_UPDATE_LENGTH,
    message = ProductsConstants.NAME_EMPTY_MESSAGE,
    groups = AppConstants.ValidationGroups.ToUpdate.class
  )
  private String name;

  @NotNull(
    message = ProductsConstants.PRICE_EMPTY_MESSAGE,
    groups = AppConstants.ValidationGroups.ToCreate.class
  )
  private Float price;

  private String image;
  private Integer stock;
  private Integer stockPerTime;
  private ClientProductCategory category;
  private List<ClientProductVariant> variants;
  private Boolean useStockForVariants;
  private Boolean isAvailable;
  private Boolean isArchived;
  private Date createdAt;
  private Date updatedAt;
  private Date archivedAt;

}
