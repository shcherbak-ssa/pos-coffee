package com.digitazon.poscoffee.models.helpers.client;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClientOrderLineVariant {

  private Long id;
  private String productName;
  private String variantName;
  private String image;

}
