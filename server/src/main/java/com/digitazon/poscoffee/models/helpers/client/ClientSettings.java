package com.digitazon.poscoffee.models.helpers.client;

import com.digitazon.poscoffee.shared.annotations.EqualTo;
import com.digitazon.poscoffee.shared.constants.SettingsConstants;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClientSettings {

  private Long id;

  @EqualTo(
    message = "Currency",
    values = {
      SettingsConstants.ClientCurrency.USD,
      SettingsConstants.ClientCurrency.EUR
    }
  )
  private String currency;

  private Byte taxes;

}
