package com.digitazon.poscoffee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import com.digitazon.poscoffee.models.helpers.Config;
import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.utils.DatabaseDataLoader;
import com.digitazon.poscoffee.shared.utils.LocalResourceLoader;

@Component
public class ApplicationStartupRunner implements CommandLineRunner {

  @Autowired
  private Environment env;

  @Autowired
  private DatabaseDataLoader dataLoader;

  @Autowired
  private LocalResourceLoader localResourceLoader;

  @Override
  public void run(String... args) throws Exception {
    this.addConsoleSpace();

    Config config = this.localResourceLoader
      .loadJSONResource(AppConstants.POSCOFFEE_CONFIG_FILENAME, Config.class);

    this.dataLoader.loadConstants();
    this.log("# Constants loaded");

    this.dataLoader.loadConfigData(config);
    this.log("# Config loaded");

    this.logStartedMessage();

    this.log("\n");
  }

  private void addConsoleSpace() {
    this.log("\n");
    this.log("########################################################################################");
    this.log("\n");
  }

  private void logStartedMessage() {
    this.log(String.format("# Application started on port %s", this.env.getProperty("server.port")));
  }

  private void log(String message) {
    System.out.println(message);
  }

}
