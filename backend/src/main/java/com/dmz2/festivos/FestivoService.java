package com.dmz2.festivos;

import com.dmz2.historial.HistorialCarga;
import com.dmz2.historial.HistorialCargaRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class FestivoService {

    private final FestivoRepository repository;
    private final HistorialCargaRepository historialRepository;

    public FestivoService(FestivoRepository repository, HistorialCargaRepository historialRepository) {
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
                    Integer mes = Integer.parseInt(data[2].trim());
                    Integer diasFestivos = Integer.parseInt(data[3].trim());

                    Optional<Festivo> existente = repository.findByTrabajadorIdAndAnioAndMes(trabajadorId, anio, mes);

                    Festivo festivo;
                    if (existente.isPresent()) {
                        festivo = existente.get();
                    } else {
                        festivo = new Festivo();
                        festivo.setTrabajadorId(trabajadorId);
                        festivo.setAnio(anio);
                        festivo.setMes(mes);
                    }

                    festivo.setDiasFestivos(diasFestivos);
                    repository.save(festivo);
                }
            }
        }

        // Guardar en el historial de cargas
        HistorialCarga historial = new HistorialCarga();
        historial.setTipo("FESTIVOS");
        historial.setFechaCarga(LocalDateTime.now());
        historial.setNombreArchivo(file.getOriginalFilename());
        historialRepository.save(historial);
    }
}
