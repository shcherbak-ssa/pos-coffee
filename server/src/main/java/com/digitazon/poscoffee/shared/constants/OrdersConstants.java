package com.digitazon.poscoffee.shared.constants;

public class OrdersConstants {

  public static final Long ORDER_NUMBER_BASE = 10000L;

  public static final String PAYMENT_METHOD_EMPTY_MESSAGE = "Payment method cannot be empty";

  public static final String ORDER_JOIN_COLUMN = "order_id";
  public static final String LINE_JOIN_COLUMN = "line_id";
  public static final String PAYMENT_JOIN_COLUMN = "payment_id";

  public static enum PaymentMethod {
    CASH,
    CARD,
    MISC
  }

  public static final class ConfigPaymentMethod {
    public static final String CASH = "CASH";
    public static final String CARD = "CARD";
    public static final String MISC = "MISC";
  }

}
