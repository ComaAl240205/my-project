package io.github.comaal240205.backend.service;

import io.github.comaal240205.backend.dto.RegisterLoginRequest;
import io.github.comaal240205.backend.dto.RegisterLoginResponse;
import io.github.comaal240205.backend.entity.User;
import io.github.comaal240205.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public RegisterLoginResponse register(RegisterLoginRequest request) {
        String normalizedEmail = request.email()
                .trim()
                .toLowerCase();

        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new IllegalArgumentException(
                    "Diese E-Mail-Adresse ist bereits registriert"
            );
        }

        User user = new User();
        user.setEmail(normalizedEmail);
        user.setPassword(
                passwordEncoder.encode(request.password())
        );

        User savedUser = userRepository.save(user);

        return new RegisterLoginResponse(
                savedUser.getId(),
                savedUser.getEmail(),
                "Benutzer wurde erfolgreich registriert"
        );
    }
    @Transactional
    public RegisterLoginResponse login(RegisterLoginRequest request){
        String normalizedEmail = request.email()
                .trim()
                .toLowerCase();

        User user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Benutzer nicht gefunden"
                ));
        if (!passwordEncoder.matches(request.password(), user.getPassword())){
            throw new IllegalArgumentException("E-Mail oder Passwort ist falsch");
        }

        return new RegisterLoginResponse(
                user.getId(),
                user.getEmail(),
                "Login Erfolgreich"
        );
    }
}