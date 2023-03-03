package com.digitazon.poscoffee.models.helpers;

import java.util.List;

import com.digitazon.poscoffee.models.helpers.client.ClientCategory;
import com.digitazon.poscoffee.models.helpers.client.ClientUser;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class SearchAdminResult {

  private List<ClientUser> users;
  private List<SearchProductsResult> products;
  private List<ClientCategory> categories;

}
