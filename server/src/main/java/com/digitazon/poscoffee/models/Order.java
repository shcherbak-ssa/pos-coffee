package com.digitazon.poscoffee.models;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.digitazon.poscoffee.shared.constants.AppConstants;
import com.digitazon.poscoffee.shared.constants.OrdersConstants;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = AppConstants.DatabaseTable.ORDERS)
@EntityListeners(AuditingEntityListener.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Order {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Float total;

  @OneToMany(
    fetch = FetchType.EAGER
  )
  @JoinTable(
    name = AppConstants.DatabaseTable.ORDER_LINE_JOIN,
    joinColumns = @JoinColumn(name = OrdersConstants.ORDER_JOIN_COLUMN),
    inverseJoinColumns = @JoinColumn(name = OrdersConstants.LINE_JOIN_COLUMN)
  )
  private List<OrderLine> lines;

  @OneToOne
  private User user;

  @CreatedDate
  private Date createdAt;

}
