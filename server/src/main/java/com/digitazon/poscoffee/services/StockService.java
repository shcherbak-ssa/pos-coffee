package com.digitazon.poscoffee.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitazon.poscoffee.models.Product;
import com.digitazon.poscoffee.models.ProductVariant;
import com.digitazon.poscoffee.models.helpers.ProductFilter;
import com.digitazon.poscoffee.models.helpers.client.ClientOrderLine;
import com.digitazon.poscoffee.models.helpers.client.ClientProduct;
import com.digitazon.poscoffee.models.helpers.client.ClientProductVariant;
import com.digitazon.poscoffee.shared.constants.ProductsConstants;
import com.digitazon.poscoffee.shared.exceptions.AlreadyExistException;
import com.digitazon.poscoffee.shared.exceptions.ResourceNotFoundException;

@Service
public class StockService {

  @Autowired
  private ProductsService productsService;

  @Autowired
  private ProductVariantsService variantsService;

  public void takeStock(List<ClientOrderLine> lines) throws AlreadyExistException, ResourceNotFoundException {
    for (ClientOrderLine orderLine : lines) {
      final Product product = this.productsService.findProductById(orderLine.getProductId());
      final ProductVariant variant = orderLine.getVariantId() == null
        ? null
        : this.variantsService.findVariantById(orderLine.getVariantId());

      if (variant == null) {
        this.updateProductStock(product, (product.getStockPerTime() * orderLine.getCount()));
        return;
      }

      final Integer stockPerTime = variant.getStockPerTime() == null
        ? product.getStockPerTime()
        : variant.getStockPerTime();

      final Integer stockToRemove = stockPerTime * orderLine.getCount();

      if (variant.getStock() == null) {
        this.updateProductStock(product, stockToRemove);
        return;
      }

      final ClientProductVariant varaintToUpdate = ClientProductVariant.builder()
        .id(variant.getId())
        .stock(variant.getStock() - stockToRemove)
        .build();

      final String[] nullLabels = { ProductsConstants.STOCK_LABEL };
      final ProductFilter filter = ProductFilter.builder()
        .nullLabels(nullLabels)
        .build();

      this.variantsService.updateVariant(varaintToUpdate, filter);
    }
  }

  private void updateProductStock(
    Product product, Integer stockToRemove
  ) throws AlreadyExistException, ResourceNotFoundException {
    final ClientProduct productToUpdate = ClientProduct.builder()
      .id(product.getId())
      .stock(product.getStock() - stockToRemove)
      .build();

    this.productsService.updateProduct(productToUpdate);
  }

}
