package com.ruthra.projetonosdamota.repository;

import com.ruthra.projetonosdamota.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {


}
