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
import com.digitazon.poscoffee.models.helpers.client.ClientCategory;
import com.digitazon.poscoffee.models.helpers.client.ClientProductCategory;
import com.digitazon.poscoffee.repositories.CategoriesRepository;
import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.constants.CategoriesConstants;
import com.digitazon.poscoffee.shared.exceptions.AlreadyExistException;
import com.digitazon.poscoffee.shared.exceptions.ResourceNotFoundException;
import com.digitazon.poscoffee.shared.types.BaseServiceHelpers;

@Service
public class CategoriesService {

  // @TODO: conver to annotation
  private AnnotationConfigApplicationContext context
    = new AnnotationConfigApplicationContext(AppConfig.class);

  @Autowired
  private CategoriesRepository repository;

  private BaseServiceHelpers helpers;

  public CategoriesService() {
    this.helpers = (BaseServiceHelpers) this.context.getBean("serviceHelpers", AppConstants.Entity.CATEGORY);
  }

  public boolean isCategoryExist(String name) {
    return this.repository.existsByName(name);
  }

  public List<ClientCategory> getCategories(boolean onlyAvailable) {
    final List<Category> categories = this.repository.findAll(CategoriesService.filter(onlyAvailable));

    return categories
      .stream()
      .map(this::convertToClientCategory)
      .collect(Collectors.toList());
  }

  public List<ClientProductCategory> getProductCategories() {
    final List<Category> categories = this.repository.findAll();

    return categories
      .stream()
      .map(this::convertToClientProductCategory)
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

  public void updateCategory(ClientCategory updates) throws AlreadyExistException, ResourceNotFoundException {
    final String updatedName = updates.getName();

    if (updatedName != null && this.isCategoryExist(updatedName)) {
      throw new AlreadyExistException(CategoriesConstants.UNIQUE_FIELD, CategoriesConstants.ALREADY_EXIST_MESSAGE);
    }

    this.helpers.update(
      updates.getId(),
      this.repository,
      (Category category) -> this.mergeWithUpdates(category, updates)
    );
  }

  public void deleteCategory(Long id) {
    this.repository.deleteById(id);
  }

  private ClientCategory convertToClientCategory(Category category) {
    return (ClientCategory) this.context.getBean("clientCategory", category);
  }

  private Category convertToCategory(ClientCategory category) {
    return (Category) this.context.getBean("category", category);
  }

  private ClientProductCategory convertToClientProductCategory(Category category) {
    return (ClientProductCategory) this.context.getBean("clientProductCategory", category);
  }

  private void mergeWithUpdates(Category category, ClientCategory updates) {
    category.setName(updates.getName() == null ? category.getName() : updates.getName());
    category
      .setIsAvailable(updates.getIsAvailable() == null ? category.getIsAvailable() : updates.getIsAvailable());
  }

  private static Specification<Category> filter(boolean onlyAvailable) {
    return new Specification<Category>() {

      @Override
      public Predicate toPredicate(Root<Category> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        final Path<Category> isAvailablePath = root.get("isAvailable");

        if (onlyAvailable) {
          return builder.equal(isAvailablePath, true);
        }

        return builder.or(
          builder.equal(isAvailablePath, true),
          builder.equal(isAvailablePath, false)
        );
      }

    };
  }

}
