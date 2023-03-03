package com.digitazon.poscoffee.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.digitazon.poscoffee.models.constants.Currency;
import com.digitazon.poscoffee.shared.constants.SettingsConstants;

public interface CurrenciesRepository extends JpaRepository<Currency, Long> {

  public Currency findByName(SettingsConstants.Currency name);

}
