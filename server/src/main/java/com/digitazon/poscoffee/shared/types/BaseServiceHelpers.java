package com.digitazon.poscoffee.shared.types;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.digitazon.poscoffee.models.helpers.BaseEntityDates;
import com.digitazon.poscoffee.shared.exceptions.ResourceNotFoundException;

public interface BaseServiceHelpers {

  public interface MergeWithUpdates<T> {
    public void mergeWithUpdates(T entity);
  }

  public <T> void update(Long id, PagingAndSortingRepository<T, Long> repository, MergeWithUpdates<T> merge) throws ResourceNotFoundException;
  public <T extends BaseEntityDates> void archiveById(Long id, PagingAndSortingRepository<T, Long> repository) throws ResourceNotFoundException;
  public <T extends BaseEntityDates> void restoreById(Long id, PagingAndSortingRepository<T, Long> repository) throws ResourceNotFoundException;

}
