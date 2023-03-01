package com.digitazon.poscoffee.models.helpers;

import java.util.List;

import com.digitazon.poscoffee.models.helpers.client.ClientOrder;
import com.digitazon.poscoffee.models.helpers.client.ClientUser;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppHome {

  private List<ClientUser> users;
  private List<ClientOrder> orders;

}
