package com.digitazon.poscoffee.shared.types;

import org.springframework.data.jpa.repository.JpaRepository;

import com.digitazon.poscoffee.models.helpers.base.BaseEntityDates;
import com.digitazon.poscoffee.shared.exceptions.ResourceNotFoundException;

public interface BaseServiceHelpers {

  public interface MergeWithUpdates<T> {
    public void mergeWithUpdates(T entity);
  }

  public <T> void update(Long id, JpaRepository<T, Long> repository, MergeWithUpdates<T> merge) throws ResourceNotFoundException;
  public <T extends BaseEntityDates> void archiveById(Long id, JpaRepository<T, Long> repository) throws ResourceNotFoundException;
  public <T extends BaseEntityDates> void restoreById(Long id, JpaRepository<T, Long> repository) throws ResourceNotFoundException;

}
