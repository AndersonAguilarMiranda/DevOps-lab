CREATE TABLE trabajadores (
    id BIGINT PRIMARY KEY
);

CREATE TABLE registros_mensuales (
    id BIGSERIAL PRIMARY KEY,
    trabajador_id BIGINT NOT NULL REFERENCES trabajadores(id) ON DELETE CASCADE,
    mes INT NOT NULL CHECK (mes BETWEEN 1 AND 12),
    anio INT NOT NULL,
    flexis_positivas DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    flexis_negativas DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    balance_flexis DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    complementarias_semanales JSONB NOT NULL DEFAULT '[]'::jsonb,
    festivos INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(trabajador_id, mes, anio)
);

CREATE INDEX idx_registros_trabajador_mes ON registros_mensuales(trabajador_id, anio, mes);
