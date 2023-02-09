package com.digitazon.poscoffee.shared.utils;

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
    ClassPathResource resource = new ClassPathResource(filename);
    InputStream resourceInputStream = resource.getInputStream();

    try (BufferedReader reader = new BufferedReader(new InputStreamReader(resourceInputStream))) {
      String content = reader.lines().collect(Collectors.joining(AppConstants.EMPTY_STRING));
      ObjectMapper objectMapper = new ObjectMapper();

      return objectMapper.readValue(content, resourceClass);
    }
  }

}
