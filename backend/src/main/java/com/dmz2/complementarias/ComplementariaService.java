package com.dmz2.complementarias;

import com.dmz2.historial.HistorialCarga;
import com.dmz2.historial.HistorialCargaRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ComplementariaService {

    private final ComplementariaRepository repository;
    private final HistorialCargaRepository historialRepository;

    public ComplementariaService(ComplementariaRepository repository, HistorialCargaRepository historialRepository) {
        this.repository = repository;
        this.historialRepository = historialRepository;
    }

    public void procesarCsv(MultipartFile file) throws Exception {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            boolean isFirstLine = true;

            while ((line = br.readLine()) != null) {
                if (isFirstLine) {
                    isFirstLine = false;
                    continue;
                }

                String[] data = line.split(",");

                if (data.length >= 4) {
                    Long trabajadorId = Long.parseLong(data[0].trim());
                    Integer anio = Integer.parseInt(data[1].trim());
                    Integer semana = Integer.parseInt(data[2].trim());
                    Integer diasTrabajados = Integer.parseInt(data[3].trim());

                    Optional<Complementaria> existente = repository.findByTrabajadorIdAndAnioAndSemana(trabajadorId, anio, semana);

                    Complementaria comp;
                    if (existente.isPresent()) {
                        comp = existente.get();
                    } else {
                        comp = new Complementaria();
                        comp.setTrabajadorId(trabajadorId);
                        comp.setAnio(anio);
                        comp.setSemana(semana);
                    }

                    comp.setDiasTrabajados(diasTrabajados);
                    repository.save(comp);
                }
            }
        }

        // Guardar en el historial de cargas
        HistorialCarga historial = new HistorialCarga();
        historial.setTipo("COMPLEMENTARIAS");
        historial.setFechaCarga(LocalDateTime.now());
        historial.setNombreArchivo(file.getOriginalFilename());
        historialRepository.save(historial);
    }
}
