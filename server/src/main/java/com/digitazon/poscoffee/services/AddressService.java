package com.digitazon.poscoffee.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitazon.poscoffee.models.Address;
import com.digitazon.poscoffee.repositories.AddressRepository;
import com.digitazon.poscoffee.shared.exceptions.ResourceNotFoundException;

@Service
public class AddressService {

  @Autowired
  private AddressRepository repository;

  public Address createAddress(Address address) {
    return this.repository.save(address);
  }

  public void updateAddress(Address updates) throws ResourceNotFoundException {
    final Optional<Address> foundAddress = this.repository.findById(updates.getId());

    if (foundAddress.isPresent()) {
      final Address address = foundAddress.get();
      this.mergeWithUpdates(address, updates);

      this.repository.save(address);

      return;
    }

    throw new ResourceNotFoundException("Address not found");
  }

  private void mergeWithUpdates(Address address, Address updates) {
    address.setCountry(updates.getCountry() == null ? address.getCountry() : updates.getCountry());
    address.setState(updates.getState() == null ? address.getState() : updates.getState());
    address.setCity(updates.getCity() == null ? address.getCity() : updates.getCity());
    address.setZipCode(updates.getZipCode() == null ? address.getZipCode() : updates.getZipCode());
    address.setAddress(updates.getAddress() == null ? address.getAddress() : updates.getAddress());
  }

}
