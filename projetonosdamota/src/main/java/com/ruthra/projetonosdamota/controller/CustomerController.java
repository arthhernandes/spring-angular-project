package com.ruthra.projetonosdamota.controller;

import com.ruthra.projetonosdamota.model.Customer;
import com.ruthra.projetonosdamota.repository.CustomerRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping
    public List<Customer> findAll() {
        return customerRepository.findAll();
    }

    @PostMapping
    public Customer save(@Valid @RequestBody Customer customer) {
        return customerRepository.save(customer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        customerRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
