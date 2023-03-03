package com.digitazon.poscoffee.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitazon.poscoffee.models.constants.Currency;
import com.digitazon.poscoffee.repositories.CurrenciesRepository;
import com.digitazon.poscoffee.shared.constants.SettingsConstants;

@Service
public class CurrenciesService {

  @Autowired
  private CurrenciesRepository repository;

  public void loadCurrencies() {
    for (SettingsConstants.Currency currencyValue : SettingsConstants.Currency.values()) {
      final Currency currency = new Currency();
      currency.setName(currencyValue);

      this.repository.save(currency);
    }
  }

  public Currency getByName(SettingsConstants.Currency name) {
    return this.repository.findByName(name);
  }

  public Currency getByName(String name) {
    return this.getByName(SettingsConstants.Currency.valueOf(name));
  }

}
