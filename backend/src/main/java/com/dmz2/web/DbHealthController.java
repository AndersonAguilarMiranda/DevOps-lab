package com.dmz2.web;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class DbHealthController {

    private final JdbcTemplate jdbcTemplate;

    public DbHealthController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/api/health/db")
    public Map<String, Object> checkDb() {
        Integer result = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
        return Map.of(
            "database", "connected",
            "select_1_result", result
        );
    }
}
