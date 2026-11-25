package com.dmz2.complementarias;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ComplementariaRepository extends JpaRepository<Complementaria, Long> {
    Optional<Complementaria> findByTrabajadorIdAndAnioAndSemana(Long trabajadorId, Integer anio, Integer semana);
}
