package com.dmz2.flexis;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigDecimal;

@Service
public class FlexiService {

    private final FlexiRepository flexiRepository;

    public FlexiService(FlexiRepository flexiRepository) {
        this.flexiRepository = flexiRepository;
    }

    public void procesarCsv(MultipartFile file) throws Exception {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            boolean isFirstLine = true;

            while ((line = br.readLine()) != null) {
                // Saltamos la primera línea si es la cabecera (ej. "id,mes,año,positivas...")
                if (isFirstLine) {
                    isFirstLine = false;
                    continue;
                }

                // Separamos por comas (o por punto y coma si el CSV usa ese formato)
                String[] data = line.split(",");

                // Ejemplo de CSV: 101,11,2026,10.5,2.0,5.0,1.0
                if (data.length >= 7) {
                    Flexi flexi = new Flexi();
                    flexi.setTrabajadorId(Long.parseLong(data[0].trim()));
                    flexi.setMes(Integer.parseInt(data[1].trim()));
                    flexi.setAnio(Integer.parseInt(data[2].trim()));
                    flexi.setPositivas(new BigDecimal(data[3].trim()));
                    flexi.setNegativas(new BigDecimal(data[4].trim()));
                    flexi.setParcialesPositivas(new BigDecimal(data[5].trim()));
                    flexi.setParcialesNegativas(new BigDecimal(data[6].trim()));

                    flexiRepository.save(flexi);
                }
            }
        }
    }
}
