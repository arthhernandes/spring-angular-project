package com.ruthra.projetonosdamota.dto;

import com.ruthra.projetonosdamota.model.Order;
import com.ruthra.projetonosdamota.model.Product;

import java.util.List;
import java.util.stream.Collectors;

public record OrderDTO(
        Long id,
        String customerName,
        List<String> productNames,
        Double price,
        String status
) {

    public OrderDTO(Order order){
        this(
                order.getId(),
                order.getCustomer() != null ? order.getCustomer().getName() : "Cliente não identificado",
                order.getProduct() != null ?
                        order.getProduct().stream().map(Product::getName).toList() : List.of(),
                order.getPrice(),
                order.getStatus() != null ? order.getStatus() : "Pendente"
        );
    }
}
