package com.digitazon.poscoffee.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.digitazon.poscoffee.models.constants.Currency;
import com.digitazon.poscoffee.shared.constants.AppConstants;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = AppConstants.DatabaseTable.SETTINGS)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Settings {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne
  private Currency currency;

  private Byte taxes;

}
