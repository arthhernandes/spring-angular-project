package com.ruthra.projetonosdamota.service;

import com.ruthra.projetonosdamota.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.ruthra.projetonosdamota.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User userEntity = userRepository.findByUsername(username)
                .orElseThrow(() -> {
                    System.out.println("ERRO: Usuário não encontrado no Postgres!");
                    return new UsernameNotFoundException("Não achei");
                });

        return org.springframework.security.core.userdetails.User.builder()
                .username(userEntity.getUsername())
                .password(userEntity.getPassword())
                .roles("ADMIN")
                .build();
    }
}
