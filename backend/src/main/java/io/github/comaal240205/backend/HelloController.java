package io.github.comaal240205.backend;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://10.0.0.52:3000"
})
public class HelloController {

    @GetMapping("/api/hello")
    public Message hello() {
        return new Message(
                "Frontend und Spring-Boot-Backend sind verbunden!"
        );
    }

    public record Message(String message) {
    }
}
