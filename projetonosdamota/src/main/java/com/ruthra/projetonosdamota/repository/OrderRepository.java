package com.ruthra.projetonosdamota.repository;

import com.ruthra.projetonosdamota.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("SELECT SUM(o.price) FROM Order o")
    Double sumAllRevenue();

    long countByStatus(String status);
}
