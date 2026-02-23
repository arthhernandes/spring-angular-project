package com.ruthra.projetonosdamota.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Table(name = "tb_customer")
@Data // lombok create getters and setters
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome não pode estar vazio!")
    @Column(nullable = false)
    private String name;

    @Email(message = "E-mail deve ser válido!")
    @NotBlank(message = "O e-mail é obrigatório!")
    @Column(nullable = false)
    private String email;

    private String phone;
}
