package com.digitazon.poscoffee.models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.constants.ProductsConstants;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = AppConstants.DatabaseTable.PRODUCTS)
@EntityListeners(AuditingEntityListener.class)
@Data
@NoArgsConstructor
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(
    message = ProductsConstants.SKU_EMPTY_MESSAGE,
    groups = AppConstants.ValidationGroups.ToCreate.class
  )
  @Size(
    min = ProductsConstants.MIN_SKU_LENGTH,
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
  private Byte price;

  private String photo;

  private Boolean isArchived;

  @CreatedDate
  private Date createdAt;

  @LastModifiedDate
  private Date updatedAt;

  private Date archivedAt;

}
