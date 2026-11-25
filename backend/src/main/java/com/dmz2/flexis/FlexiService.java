package com.dmz2.flexis;

import com.dmz2.historial.HistorialCarga;
import com.dmz2.historial.HistorialCargaRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class FlexiService {

    private final FlexiRepository flexiRepository;
    private final HistorialCargaRepository historialRepository;

    // EL CONSTRUCTOR DEBE TENER LOS DOS REPOSITORIOS Y ASIGNARLOS
    public FlexiService(FlexiRepository flexiRepository, HistorialCargaRepository historialRepository) {
        this.flexiRepository = flexiRepository;
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

                if (data.length >= 7) {
                    Long trabajadorId = Long.parseLong(data[0].trim());
                    Integer mes = Integer.parseInt(data[1].trim());
                    Integer anio = Integer.parseInt(data[2].trim());

                    Optional<Flexi> flexiExistente = flexiRepository.findByTrabajadorIdAndMesAndAnio(trabajadorId, mes, anio);

                    Flexi flexi;
                    if (flexiExistente.isPresent()) {
                        flexi = flexiExistente.get();
                    } else {
                        flexi = new Flexi();
                        flexi.setTrabajadorId(trabajadorId);
                        flexi.setMes(mes);
                        flexi.setAnio(anio);
                    }

                    flexi.setPositivas(new BigDecimal(data[3].trim()));
                    flexi.setNegativas(new BigDecimal(data[4].trim()));
                    flexi.setParcialesPositivas(new BigDecimal(data[5].trim()));
                    flexi.setParcialesNegativas(new BigDecimal(data[6].trim()));

                    flexiRepository.save(flexi);
                }
            }
        }

        // Guardar en el historial de cargas
        HistorialCarga historial = new HistorialCarga();
        historial.setTipo("FLEXIS");
        historial.setFechaCarga(LocalDateTime.now());
        historial.setNombreArchivo(file.getOriginalFilename());
        historialRepository.save(historial);
    }
}
