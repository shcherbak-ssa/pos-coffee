package com.digitazon.poscoffee.models;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.digitazon.poscoffee.shared.constants.DatabaseConstants;
import com.digitazon.poscoffee.shared.constants.UsersConstants;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = DatabaseConstants.Table.USER_TYPES)
@Data
@NoArgsConstructor
public class UserType {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Enumerated(EnumType.STRING)
  private UsersConstants.UserType name;

}
