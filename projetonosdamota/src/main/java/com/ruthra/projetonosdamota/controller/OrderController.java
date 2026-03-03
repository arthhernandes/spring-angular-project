package com.ruthra.projetonosdamota.controller;

import com.ruthra.projetonosdamota.dto.OrderDTO;
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
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping
    public List<OrderDTO> findAll() {
        return orderRepository.findAllWithDetails()
                .stream()
                .map(OrderDTO::new)
                .toList();
    }

    public Map<String, Double> getGraphData() {
        return orderRepository.getRevenueByStatus().stream()
                .collect(Collectors.toMap(
                        array -> (String) array[0],
                        array -> (Double) array[1]
                ));
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
