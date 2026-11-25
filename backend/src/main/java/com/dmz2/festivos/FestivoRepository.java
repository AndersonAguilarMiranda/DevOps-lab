package com.dmz2.festivos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface FestivoRepository extends JpaRepository<Festivo, Long> {
    Optional<Festivo> findByTrabajadorIdAndAnioAndMes(Long trabajadorId, Integer anio, Integer mes);
}
