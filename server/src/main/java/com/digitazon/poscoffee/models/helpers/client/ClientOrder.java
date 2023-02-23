package com.digitazon.poscoffee.models.helpers.client;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClientOrder {

  private Long id;
  private String number;
  private Float total;
  private List<ClientOrderLine> lines;
  private ClientOrderUser user;
  private Date createdAt;

}
