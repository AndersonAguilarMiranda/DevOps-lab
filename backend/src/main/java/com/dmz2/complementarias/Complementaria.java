package com.dmz2.complementarias;

import jakarta.persistence.*;

@Entity
@Table(name = "complementarias")
public class Complementaria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "trabajador_id")
    private Long trabajadorId;

    private Integer semana;

    @Column(name = "año")
    private Integer anio;

    @Column(name = "dias_trabajados")
    private Integer diasTrabajados;

    // GETTERS Y SETTERS
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getTrabajadorId() { return trabajadorId; }
    public void setTrabajadorId(Long trabajadorId) { this.trabajadorId = trabajadorId; }
    public Integer getSemana() { return semana; }
    public void setSemana(Integer semana) { this.semana = semana; }
    public Integer getAnio() { return anio; }
    public void setAnio(Integer anio) { this.anio = anio; }
    public Integer getDiasTrabajados() { return diasTrabajados; }
    public void setDiasTrabajados(Integer diasTrabajados) { this.diasTrabajados = diasTrabajados; }
}
