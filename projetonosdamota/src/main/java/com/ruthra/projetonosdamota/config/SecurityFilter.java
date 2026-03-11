package com.ruthra.projetonosdamota.config;

import com.ruthra.projetonosdamota.repository.UserRepository;
import com.ruthra.projetonosdamota.service.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        var token = this.recoverToken(request);

        if (token != null) {
            System.out.println("DEBUG: Token extraído do Header: " + token);

            var login = tokenService.validateToken(token);
            System.out.println("DEBUG: Username extraído do Token: " + login);

            if (login != null) {
                var userOptional = userRepository.findByUsername(login);

                if (userOptional.isPresent()) {
                    UserDetails user = userOptional.get();
                    System.out.println("DEBUG: Usuário encontrado no banco: " + user.getUsername());

                    var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    System.out.println("DEBUG: Autenticação concluída com sucesso!");
                } else {
                    System.out.println("DEBUG: Erro - Login extraído do token não existe no banco!");
                }
            } else {
                System.out.println("DEBUG: Erro - TokenService não conseguiu validar a assinatura!");
            }
        }

        filterChain.doFilter(request, response);    
    }

    private String recoverToken(HttpServletRequest request) {
        var authHeader = request.getHeader("Authorization");
        if (authHeader == null ) return null;
        return authHeader.replace("Bearer ", "");
    }
}
