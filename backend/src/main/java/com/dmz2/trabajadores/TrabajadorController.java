package com.dmz2.trabajadores;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trabajadores")
public class TrabajadorController {

    private final TrabajadorRepository repository;

    public TrabajadorController(TrabajadorRepository repository) {
        this.repository = repository;
    }

    // Endpoint para listar todos los trabajadores
    @GetMapping
    public List<Trabajador> listarTodos() {
        return repository.findAll();
    }

    // Endpoint para crear un trabajador (simula la subida del CSV)
    @PostMapping
    public ResponseEntity<Trabajador> crear(@RequestBody Trabajador trabajador) {
        Trabajador nuevo = repository.save(trabajador);
        return ResponseEntity.ok(nuevo);
    }
}
