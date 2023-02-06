package com.digitazon.poscoffee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class ApplicationStartupRunner implements CommandLineRunner {

  @Autowired
  private Environment env;

  @Override
  public void run(String... args) throws Exception {
    this.addConsoleSpace();
    this.logStartedMessage();
  }

  private void addConsoleSpace() {
    System.out.println();
    System.out.println("##########################################################");
    System.out.println();
  }

  private void logStartedMessage() {
    System.out.println(String.format("Application started on port %s", this.env.getProperty("server.port")));
    System.out.println();
  }

}
