package com.digitazon.poscoffee.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.digitazon.poscoffee.models.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {}
