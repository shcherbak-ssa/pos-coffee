package com.digitazon.poscoffee.models.helpers.client;

import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotNull;

import com.digitazon.poscoffee.shared.annotations.EqualTo;
import com.digitazon.poscoffee.shared.constants.OrdersConstants;

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
  private Byte taxes;
  private List<ClientOrderLine> lines;
  private ClientOrderUser user;
  private Date createdAt;

  @NotNull(message = OrdersConstants.PAYMENT_METHOD_EMPTY_MESSAGE)
  @EqualTo(
    message = "Payment method",
    values = {
      OrdersConstants.ConfigPaymentMethod.CASH,
      OrdersConstants.ConfigPaymentMethod.CARD,
      OrdersConstants.ConfigPaymentMethod.MISC
    }
  )
  private String paymentMethod;

}
