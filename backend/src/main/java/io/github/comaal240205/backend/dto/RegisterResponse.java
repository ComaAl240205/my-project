package io.github.comaal240205.backend.dto;

public record RegisterResponse(
        Long id,
        String email,
        String message
) {
}
