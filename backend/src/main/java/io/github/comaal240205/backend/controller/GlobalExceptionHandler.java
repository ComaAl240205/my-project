package io.github.comaal240205.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleConflict(
            IllegalArgumentException exception
    ) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(Map.of(
                        "error", exception.getMessage()
                ));
    }

    @ExceptionHandler()
    public ResponseEntity<Map<String, List<String>>> handleValidation(
            MethodArgumentNotValidException exception
    ) {
        Map<String, List<String>> errors = new LinkedHashMap<>();


        exception.getBindingResult()
                .getFieldErrors()
                .forEach(error ->


                        errors.computeIfAbsent(
                                error.getField(),
                                key -> new ArrayList<>()
                        ).add(error.getDefaultMessage())
                );

        return ResponseEntity
                .badRequest()
                .body(errors);
    }
}