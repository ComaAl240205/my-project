package io.github.comaal240205.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank(message = "E-Mail darf nicht leer sein")
        @Email(message = "E-Mail-Format ist ungültig")
        String email,

        @NotBlank(message = "Passwort darf nicht leer sein")
        @Size(min = 8, max = 72,
              message = "Passwort muss zwischen 8 und 72 Zeichen lang sein")
        String password
) {
}
