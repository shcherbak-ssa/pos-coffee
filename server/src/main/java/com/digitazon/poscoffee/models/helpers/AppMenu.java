package com.digitazon.poscoffee.models.helpers;

import java.util.List;

import com.digitazon.poscoffee.models.helpers.client.ClientCategory;
import com.digitazon.poscoffee.models.helpers.client.ClientProduct;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppMenu {

  private List<ClientCategory> categories;
  private List<ClientProduct> products;

}
