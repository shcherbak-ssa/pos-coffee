package com.digitazon.poscoffee.models.helpers;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class PageResponse<T extends Object> {

  private List<T> entities;
  private Integer page;
  private Integer size;
  private Long total;
  private Integer totalPages;

}
