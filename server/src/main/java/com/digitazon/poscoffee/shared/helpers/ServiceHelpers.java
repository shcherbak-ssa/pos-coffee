package com.digitazon.poscoffee.shared.helpers;

import java.util.Date;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.digitazon.poscoffee.models.base.BaseEntity;
import com.digitazon.poscoffee.shared.exceptions.ResourceNotFoundException;

public class ServiceHelpers<T extends BaseEntity> {

  private JpaRepository<T, Long> repository;
  private String entityName;

  public ServiceHelpers(JpaRepository<T, Long> repository, String entityName) {
    this.repository = repository;
    this.entityName = entityName;
  }

  public interface MergeWithUpdates<T> {
    public void mergeWithUpdates(T entity);
  }

  public void update(Long id, MergeWithUpdates<T> merge) throws ResourceNotFoundException {
    final Optional<T> foundEntity = this.repository.findById(id);

    if (foundEntity.isPresent()) {
      final T entity = foundEntity.get();
      merge.mergeWithUpdates(entity);

      this.repository.save(entity);

      return;
    }

    this.throwResourceNotFoundException();
  }

  public void archiveById(Long id) throws ResourceNotFoundException {
    final Optional<T> foundEntity = this.repository.findById(id);

    if (foundEntity.isPresent()) {
      final T entity = foundEntity.get();
      entity.setIsArchived(true);
      entity.setArchivedAt(new Date());

      this.repository.save(entity);

      return;
    }

    this.throwResourceNotFoundException();
  }

  public void restoreById(Long id) throws ResourceNotFoundException {
    final Optional<T> foundEntity = this.repository.findById(id);

    if (foundEntity.isPresent()) {
      final T entity = foundEntity.get();

      if (!entity.getIsArchived()) {
        return;
      }

      entity.setIsArchived(false);
      entity.setArchivedAt(null);

      this.repository.save(entity);

      return;
    }

    this.throwResourceNotFoundException();
  }

  private void throwResourceNotFoundException() throws ResourceNotFoundException {
    throw new ResourceNotFoundException(this.entityName + " not found");
  }

}
