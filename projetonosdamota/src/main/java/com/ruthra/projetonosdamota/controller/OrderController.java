package com.ruthra.projetonosdamota.controller;

import com.ruthra.projetonosdamota.model.Order;
import com.ruthra.projetonosdamota.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

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
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        orderRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStatus() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalRevenue", orderRepository.sumAllRevenue());
        stats.put("pendingOrders", orderRepository.countByStatus("PENDENTE"));

        return ResponseEntity.ok(stats);
    }
}
