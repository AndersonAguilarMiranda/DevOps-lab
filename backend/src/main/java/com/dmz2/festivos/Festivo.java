package com.dmz2.festivos;

import jakarta.persistence.*;

@Entity
@Table(name = "festivos")
public class Festivo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "trabajador_id")
    private Long trabajadorId;

    private Integer mes;

    @Column(name = "año")
    private Integer anio;

    @Column(name = "dias_festivos")
    private Integer diasFestivos;

    // GETTERS Y SETTERS
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getTrabajadorId() { return trabajadorId; }
    public void setTrabajadorId(Long trabajadorId) { this.trabajadorId = trabajadorId; }
    public Integer getMes() { return mes; }
    public void setMes(Integer mes) { this.mes = mes; }
    public Integer getAnio() { return anio; }
    public void setAnio(Integer anio) { this.anio = anio; }
    public Integer getDiasFestivos() { return diasFestivos; }
    public void setDiasFestivos(Integer diasFestivos) { this.diasFestivos = diasFestivos; }
}
