package com.vitor.backend.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }

        final String authHeader =
                request.getHeader("Authorization");

        if (authHeader == null ||
                !authHeader.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);
            return;
        }

        try {
            final String token = authHeader.substring(7);

            if (token.isBlank() ||
                    token.equals("null") ||
                    token.equals("undefined")) {

                filterChain.doFilter(request, response);
                return;
            }

            final String email = jwtService.extractEmail(token);
            System.out.println("[FILTRO JWT] E-mail extraído do token: " + email);

            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                UserDetails userDetails = userDetailsService.loadUserByUsername(email);
                System.out.println("[FILTRO JWT] Username vindo do Banco (UserDetails): " + userDetails.getUsername());
                
                boolean valid = jwtService.isValid(token, userDetails);
                System.out.println("[FILTRO JWT] O token é válido segundo o JwtService? " + valid);

                if (valid) {
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );

                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    System.out.println("[FILTRO JWT] USUÁRIO AUTENTICADO COM SUCESSO NO CONTEXTO!");
                } else {
                    System.out.println("[FILTRO JWT] Método isValid retornou FALSE.");
                }
            }

        } catch (Exception e) {
            System.err.println("[FILTRO JWT] Erro capturado na validação do Token:");
            e.printStackTrace();
        }

        filterChain.doFilter(request, response);
    }
}