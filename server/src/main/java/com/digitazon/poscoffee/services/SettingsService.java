package com.digitazon.poscoffee.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.stereotype.Service;

import com.digitazon.poscoffee.configs.AppConfig;
import com.digitazon.poscoffee.models.Settings;
import com.digitazon.poscoffee.models.constants.Currency;
import com.digitazon.poscoffee.models.helpers.client.ClientSettings;
import com.digitazon.poscoffee.repositories.SettingsRepository;
import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.constants.SettingsConstants;
import com.digitazon.poscoffee.shared.exceptions.ProgerException;
import com.digitazon.poscoffee.shared.exceptions.ResourceNotFoundException;
import com.digitazon.poscoffee.shared.types.BaseServiceHelpers;

@Service
public class SettingsService {

  // @TODO: conver to annotation
  private AnnotationConfigApplicationContext context
    = new AnnotationConfigApplicationContext(AppConfig.class);

  @Autowired
  private SettingsRepository repository;

  @Autowired
  private CurrenciesService currenciesService;

  private BaseServiceHelpers helpers;

  public SettingsService() {
    this.helpers = (BaseServiceHelpers) this.context.getBean("serviceHelpers", AppConstants.Entity.SETTINGS);
  }

  public ClientSettings getSettings() throws ProgerException {
    final Optional<Settings> foundSettings = this.repository.findById(SettingsConstants.SETTINGS_ID);

    if (foundSettings.isPresent()) {
      return this.convertToClientSettings(foundSettings.get());
    }

    throw new ProgerException("Settings not found");
  }

  public void createSettings(Settings settings) {
    this.repository.save(settings);
  }

  public void updateSettings(ClientSettings updates) throws ResourceNotFoundException {
    this.helpers.update(
      updates.getId(),
      this.repository,
      (Settings settings) -> this.mergeWithUpdates(settings, updates)
    );
  }

  private void mergeWithUpdates(Settings settings, ClientSettings updates) {
    updates.setTaxes(updates.getTaxes() == null ? settings.getTaxes() : updates.getTaxes());

    if (updates.getCurrency() != null) {
      final Currency currency = this.currenciesService.getByName(updates.getCurrency());
      settings.setCurrency(currency);
    }
  }

  private ClientSettings convertToClientSettings(Settings settings) {
    return (ClientSettings) this.context.getBean("clientSettings", settings);
  }

}
