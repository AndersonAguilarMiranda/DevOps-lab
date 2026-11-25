package com.dmz2.flexis;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "flexis")
public class Flexi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "trabajador_id")
    private Long trabajadorId;

    private Integer mes;

    // Aquí hacemos el mapeo de Java (anio) a Base de Datos ("año")
    @Column(name = "año")
    private Integer anio;

    private BigDecimal positivas;
    private BigDecimal negativas;

    @Column(name = "parciales_positivas")
    private BigDecimal parcialesPositivas;

    @Column(name = "parciales_negativas")
    private BigDecimal parcialesNegativas;

    // --- GETTERS Y SETTERS ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getTrabajadorId() { return trabajadorId; }
    public void setTrabajadorId(Long trabajadorId) { this.trabajadorId = trabajadorId; }

    public Integer getMes() { return mes; }
    public void setMes(Integer mes) { this.mes = mes; }

    public Integer getAnio() { return anio; }
    public void setAnio(Integer anio) { this.anio = anio; }

    public BigDecimal getPositivas() { return positivas; }
    public void setPositivas(BigDecimal positivas) { this.positivas = positivas; }

    public BigDecimal getNegativas() { return negativas; }
    public void setNegativas(BigDecimal negativas) { this.negativas = negativas; }

    public BigDecimal getParcialesPositivas() { return parcialesPositivas; }
    public void setParcialesPositivas(BigDecimal parcialesPositivas) { this.parcialesPositivas = parcialesPositivas; }

    public BigDecimal getParcialesNegativas() { return parcialesNegativas; }
    public void setParcialesNegativas(BigDecimal parcialesNegativas) { this.parcialesNegativas = parcialesNegativas; }
}
