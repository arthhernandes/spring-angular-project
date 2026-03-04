package com.ruthra.projetonosdamota.repository;

import com.ruthra.projetonosdamota.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("SELECT o FROM Order o LEFT JOIN FETCH o.customer LEFT JOIN FETCH o.product")
    List<Order> findAllWithDetails();

    @Query("SELECT SUM(o.price) FROM Order o")
    Double sumAllRevenue();

    @Query("SELECT o.status, SUM(o.price) FROM Order o GROUP BY o.status")
    List<Object[]> getRevenueByStatus();

    long countByStatus(String status);
}
