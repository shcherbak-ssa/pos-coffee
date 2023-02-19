package com.digitazon.poscoffee.services;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.digitazon.poscoffee.configs.AppConfig;
import com.digitazon.poscoffee.models.Category;
import com.digitazon.poscoffee.models.helpers.CategoriesFilter;
import com.digitazon.poscoffee.models.helpers.ClientCategory;
import com.digitazon.poscoffee.repositories.CategoriesRepository;
import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.constants.CategoriesConstants;
import com.digitazon.poscoffee.shared.exceptions.AlreadyExistException;
import com.digitazon.poscoffee.shared.exceptions.ResourceNotFoundException;
import com.digitazon.poscoffee.shared.helpers.ServiceHelpers;

@Service
public class CategoriesService {

  // @TODO: conver to annotation
  private AnnotationConfigApplicationContext context
    = new AnnotationConfigApplicationContext(AppConfig.class);

  private CategoriesRepository repository;

  private ServiceHelpers<Category> helpers;

  @SuppressWarnings("unchecked")
  public CategoriesService(@Autowired CategoriesRepository repository) {
    this.repository = repository;
    this.helpers = (ServiceHelpers<Category>)
      this.context.getBean("serviceHelpers", repository, AppConstants.Entity.CATEGORY);
  }

  public boolean isCategoryExist(String name) {
    return this.repository.existsByName(name);
  }

  public List<ClientCategory> getCategories(CategoriesFilter filter) {
    final List<Category> categories = this.repository.findAll(CategoriesService.filter(filter));

    return categories
      .stream()
      .map(this::convertToClientCategory)
      .collect(Collectors.toList());
  }

  public ClientCategory createCategory(ClientCategory categoryToCreate) throws AlreadyExistException {
    final Category category = this.convertToCategory(categoryToCreate);
    final Category createdCategory = this.createCategory(category);

    return this.convertToClientCategory(createdCategory);
  }

  public Category createCategory(Category categoryToCreate) throws AlreadyExistException {
    if (this.isCategoryExist(categoryToCreate.getName())) {
      throw new AlreadyExistException(CategoriesConstants.UNIQUE_FIELD, CategoriesConstants.ALREADY_EXIST_MESSAGE);
    }

    return this.repository.save(categoryToCreate);
  }

  public void updateCategory(ClientCategory updates) throws ResourceNotFoundException {
    this.helpers.update(updates.getId(), (Category category) -> this.mergeWithUpdates(category, updates));
  }

  public void archiveCategoryById(Long id) throws ResourceNotFoundException {
    this.helpers.archiveById(id);
  }

  public void restoreCategoryById(Long id) throws ResourceNotFoundException {
    this.helpers.restoreById(id);
  }

  private ClientCategory convertToClientCategory(Category category) {
    return (ClientCategory) this.context.getBean("clientCategory", category);
  }

  private Category convertToCategory(ClientCategory category) {
    return (Category) this.context.getBean("category", category);
  }

  private void mergeWithUpdates(Category category, ClientCategory updates) {
    category.setName(updates.getName() == null ? category.getName() : updates.getName());
  }

  private static Specification<Category> filter(CategoriesFilter filter) {
    return new Specification<Category>() {

      @Override
      public Predicate toPredicate(Root<Category> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        final Path<Category> isArchivedPath = root.get("isArchived");
        final Boolean onlyArchived = filter.getOnlyArchived();

        if (onlyArchived != null && onlyArchived) {
          return builder.equal(isArchivedPath, true);
        }

        return builder.or(
          builder.isNull(isArchivedPath),
          builder.equal(isArchivedPath, false)
        );
      }

    };
  }

}
