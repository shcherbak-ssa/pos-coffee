package com.digitazon.poscoffee.shared.helpers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.stream.Collectors;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class LocalResourceLoader {

  public <T> T loadJSONResource(String filename, Class<T> resourceClass) throws IOException {
    final ClassPathResource resource = new ClassPathResource(filename);
    final InputStream resourceInputStream = resource.getInputStream();

    try (BufferedReader reader = new BufferedReader(new InputStreamReader(resourceInputStream))) {
      final String content = reader
        .lines()
        .collect(Collectors.joining(AppConstants.EMPTY_STRING));

      final ObjectMapper objectMapper = new ObjectMapper();

      return objectMapper.readValue(content, resourceClass);
    }
  }

  public String loadSqlScript(String filename) throws IOException {
    final ClassPathResource resource = new ClassPathResource(filename);
    final InputStream resourceInputStream = resource.getInputStream();

    try (BufferedReader reader = new BufferedReader(new InputStreamReader(resourceInputStream))) {
      return reader
        .lines()
        .collect(Collectors.joining(AppConstants.SQL_CONTENT_JOIN));
    }
  }

}
