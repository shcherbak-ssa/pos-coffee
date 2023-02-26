package com.digitazon.poscoffee.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.digitazon.poscoffee.shared.constants.AppConstants;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = AppConstants.DatabaseTable.ORDER_LINES)
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class OrderLine {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Short count;
  private Float price;

  @OneToOne
  private Product product;

  @OneToOne
  private ProductVariant variant;

}
