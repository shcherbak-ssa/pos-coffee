package com.digitazon.poscoffee.shared.helpers;

import java.util.Date;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.digitazon.poscoffee.models.helpers.base.BaseEntityDates;
import com.digitazon.poscoffee.shared.exceptions.ResourceNotFoundException;

public class ServiceHelpers {

  private String entityName;

  public ServiceHelpers(String entityName) {
    this.entityName = entityName;
  }

  public interface MergeWithUpdates<T> {
    public void mergeWithUpdates(T entity);
  }

  public <T> void update(
    Long id, JpaRepository<T, Long> repository, MergeWithUpdates<T> merge
  ) throws ResourceNotFoundException {
    final Optional<T> foundEntity = repository.findById(id);

    if (foundEntity.isPresent()) {
      final T entity = foundEntity.get();
      merge.mergeWithUpdates(entity);

      repository.save(entity);

      return;
    }

    this.throwResourceNotFoundException();
  }

  public <T extends BaseEntityDates> void archiveById(
    Long id, JpaRepository<T, Long> repository
  ) throws ResourceNotFoundException {
    final Optional<T> foundEntity = repository.findById(id);

    if (foundEntity.isPresent()) {
      final T entity = foundEntity.get();
      entity.setIsArchived(true);
      entity.setArchivedAt(new Date());

      repository.save(entity);

      return;
    }

    this.throwResourceNotFoundException();
  }

  public <T extends BaseEntityDates> void restoreById(
    Long id, JpaRepository<T, Long> repository
  ) throws ResourceNotFoundException {
    final Optional<T> foundEntity = repository.findById(id);

    if (foundEntity.isPresent()) {
      final T entity = foundEntity.get();

      if (!entity.getIsArchived()) {
        return;
      }

      entity.setIsArchived(false);
      entity.setArchivedAt(null);

      repository.save(entity);

      return;
    }

    this.throwResourceNotFoundException();
  }

  private void throwResourceNotFoundException() throws ResourceNotFoundException {
    throw new ResourceNotFoundException(this.entityName + " not found");
  }

}
