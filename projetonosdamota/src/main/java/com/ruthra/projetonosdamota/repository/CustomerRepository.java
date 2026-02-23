package com.ruthra.projetonosdamota.repository;

import com.ruthra.projetonosdamota.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
