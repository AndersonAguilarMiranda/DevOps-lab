package com.dmz2.historial;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "historial_cargas")
public class HistorialCarga {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipo; // 'FLEXIS', 'COMPLEMENTARIAS', 'FESTIVOS'
    private LocalDateTime fechaCarga;
    private String nombreArchivo;

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public LocalDateTime getFechaCarga() { return fechaCarga; }
    public void setFechaCarga(LocalDateTime fechaCarga) { this.fechaCarga = fechaCarga; }

    public String getNombreArchivo() { return nombreArchivo; }
    public void setNombreArchivo(String nombreArchivo) { this.nombreArchivo = nombreArchivo; }
}
