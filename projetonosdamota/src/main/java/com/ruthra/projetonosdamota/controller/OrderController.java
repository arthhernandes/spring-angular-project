package com.ruthra.projetonosdamota.controller;

import com.ruthra.projetonosdamota.model.Order;
import com.ruthra.projetonosdamota.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    @PostMapping
    public Order save(@RequestBody Order order) {
        return orderRepository.save(order);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        orderRepository.deleteById(id);
    }
}
