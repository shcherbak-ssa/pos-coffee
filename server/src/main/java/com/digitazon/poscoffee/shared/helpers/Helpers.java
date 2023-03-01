package com.digitazon.poscoffee.shared.helpers;

import java.util.List;
import java.util.Random;

import com.digitazon.poscoffee.models.Order;
import com.digitazon.poscoffee.models.OrderLine;
import com.digitazon.poscoffee.models.Product;
import com.digitazon.poscoffee.models.ProductVariant;
import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.constants.UsersConstants;

public class Helpers {

  public static String generatePassword() {
    final int passwordLength = UsersConstants.MIN_PASSWORD_LENGTH;
    final StringBuilder builder = new StringBuilder(passwordLength);
    final Random random = new Random();

    for (int i = 0; i < passwordLength; i += 1) {
      builder.append(
        AppConstants.PASSWORD_GENERATOR_HELPER_STRING.charAt(
          random.nextInt(AppConstants.PASSWORD_GENERATOR_HELPER_STRING.length())
        )
      );
    }

    return builder.toString();
  }

  public static float getOrderLinePrice(Product product, ProductVariant variant) {
    return variant.getPrice() == AppConstants.ZERO
      ? product.getPrice()
      : variant.getPrice();
  }

  public static float calculateTotal(Order order) {
    final List<OrderLine> lines = order.getLines();
    float total = AppConstants.ZERO;

    for (OrderLine line : lines) {
      total += line.getCount() * line.getPrice();
    }

    return total;
  }

}
