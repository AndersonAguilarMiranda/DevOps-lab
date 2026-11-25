package com.dmz2.flexis;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface FlexiRepository extends JpaRepository<Flexi, Long> {
    // Busca una flexi por trabajador, mes y año
    Optional<Flexi> findByTrabajadorIdAndMesAndAnio(Long trabajadorId, Integer mes, Integer anio);
}
