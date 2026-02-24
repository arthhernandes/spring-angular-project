package com.ruthra.projetonosdamota.repository;

import com.ruthra.projetonosdamota.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}
