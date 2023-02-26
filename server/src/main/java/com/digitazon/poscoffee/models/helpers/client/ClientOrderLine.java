package com.digitazon.poscoffee.models.helpers.client;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClientOrderLine {

  private Long id;
  private Short count;
  private Float price;
  private Long productId;
  private Long variantId;
  private String productName;
  private String variantName;
  private String image;

}
