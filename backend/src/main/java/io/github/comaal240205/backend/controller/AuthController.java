package io.github.comaal240205.backend.controller;


import io.github.comaal240205.backend.dto.RegisterLoginRequest;
import io.github.comaal240205.backend.dto.RegisterLoginResponse;
import io.github.comaal240205.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterLoginResponse> register(
            @Valid @RequestBody RegisterLoginRequest request
    ){
        RegisterLoginResponse response = authService.register(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);

    }

    @PostMapping("/login")
    public ResponseEntity<RegisterLoginResponse> login(
            @Valid @RequestBody RegisterLoginRequest request
    ){
        RegisterLoginResponse response = authService.login(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
}
