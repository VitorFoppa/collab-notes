package com.vitor.backend.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import io.jsonwebtoken.ExpiredJwtException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleValidationErrors(
            MethodArgumentNotValidException ex
    ) {
        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult()
                .getFieldErrors()
                .forEach(error -> {
                    errors.put(
                            error.getField(),
                            error.getDefaultMessage()
                    );
                });

        return errors;
    }

    @ExceptionHandler(ExpiredJwtException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public Map<String, String> handleExpiredJwt(
            ExpiredJwtException ex
    ) {
        Map<String, String> error = new HashMap<>();
        error.put("error", "Token expirado");
        return error;
    }

    @ExceptionHandler(NoteNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> handleNoteNotFound(
            NoteNotFoundException ex
    ) {
        Map<String, String> error = new HashMap<>();
        error.put("error", ex.getMessage());
        return error;
    }

    // 1. Sua exceção customizada
    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public Map<String, String> handleAccessDenied(
            AccessDeniedException ex
    ) {
        Map<String, String> error = new HashMap<>();
        error.put("error", "Erro de permissão do sistema: " + ex.getMessage());
        return error;
    }

    // 2. Exceção nativa antiga do Spring Security
    @ExceptionHandler(org.springframework.security.access.AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public Map<String, String> handleSpringSecurityAccessDenied(
            org.springframework.security.access.AccessDeniedException ex
    ) {
        Map<String, String> error = new HashMap<>();
        error.put("error", "Spring Security antigo barrou: " + ex.getMessage());
        return error;
    }

    // 3. NOVA: Exceção de Autorização do Spring Security 6+ (Anotações de Método)
    @ExceptionHandler(org.springframework.security.authorization.AuthorizationDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public Map<String, String> handleAuthorizationDenied(
            org.springframework.security.authorization.AuthorizationDeniedException ex
    ) {
        Map<String, String> error = new HashMap<>();
        error.put("error", "Spring Security Novo barrou: " + ex.getMessage());
        return error;
    }
}