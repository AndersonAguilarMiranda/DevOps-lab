package com.dmz2.historial;

import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/historial")
public class HistorialCargaController {

    private final HistorialCargaRepository repository;

    public HistorialCargaController(HistorialCargaRepository repository) {
        this.repository = repository;
    }

    // Endpoint: GET /api/historial/flexis
    @GetMapping("/{tipo}")
    public Map<String, Object> obtenerUltimaCarga(@PathVariable String tipo) {
        Map<String, Object> respuesta = new HashMap<>();

        // Convertimos a mayúsculas porque en la BD guardamos 'FLEXIS', 'FESTIVOS', etc.
        String tipoUpper = tipo.toUpperCase();

        var ultimaCarga = repository.findFirstByTipoOrderByFechaCargaDesc(tipoUpper);

        if (ultimaCarga.isPresent()) {
            respuesta.put("fecha", ultimaCarga.get().getFechaCarga());
            respuesta.put("archivo", ultimaCarga.get().getNombreArchivo());
        } else {
            respuesta.put("fecha", null);
            respuesta.put("archivo", null);
        }

        return respuesta;
    }
}
