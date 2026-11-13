package com.dmz2.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class WelcomeController {

    @GetMapping("/")
    public Map<String, String> root() {
        return Map.of(
            "app", "dmz2",
            "status", "running",
            "message", "Backend is up. Try /actuator/health"
        );
    }

    @GetMapping("/api/welcome")
    public Map<String, String> welcome() {
        return Map.of(
            "message", "Welcome to dmz2 API",
            "version", "0.0.1-SNAPSHOT"
        );
    }
}
