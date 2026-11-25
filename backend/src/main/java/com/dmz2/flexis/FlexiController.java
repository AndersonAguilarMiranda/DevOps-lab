package com.dmz2.flexis;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/flexis")
public class FlexiController {

    private final FlexiService flexiService;

    public FlexiController(FlexiService flexiService) {
        this.flexiService = flexiService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> subirCsv(@RequestParam("file") MultipartFile file) {
        try {
            flexiService.procesarCsv(file);
            return ResponseEntity.ok("Archivo CSV de Flexis procesado correctamente");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error al procesar el CSV: " + e.getMessage());
        }
    }
}
