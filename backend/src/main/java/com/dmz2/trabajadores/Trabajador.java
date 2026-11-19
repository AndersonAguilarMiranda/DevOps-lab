package com.dmz2.trabajadores;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "trabajadores")
public class Trabajador {

    @Id
    private Long id;

    // Constructor vacío requerido por JPA
    public Trabajador() {}

    public Trabajador(Long id) {
        this.id = id;
    }

    // Getters y Setters (sin Lombok)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
