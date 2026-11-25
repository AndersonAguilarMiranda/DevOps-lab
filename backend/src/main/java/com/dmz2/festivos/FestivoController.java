package com.dmz2.festivos;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/festivos")
public class FestivoController {

    private final FestivoService service;

    public FestivoController(FestivoService service) {
        this.service = service;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> subirCsv(@RequestParam("file") MultipartFile file) {
        try {
            service.procesarCsv(file);
            return ResponseEntity.ok("Archivo CSV de Festivos procesado correctamente");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error al procesar el CSV: " + e.getMessage());
        }
    }
}
