package com.dmz2.historial;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface HistorialCargaRepository extends JpaRepository<HistorialCarga, Long> {

    // Esta es la magia: Spring Boot lee el nombre del método y genera la consulta SQL.
    // Busca el primer registro por 'tipo' ordenado por 'fechaCarga' de forma descendente.
    Optional<HistorialCarga> findFirstByTipoOrderByFechaCargaDesc(String tipo);
}
