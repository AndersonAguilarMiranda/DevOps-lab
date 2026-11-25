CREATE TABLE trabajadores (
    id BIGINT PRIMARY KEY
);

CREATE TABLE historial_cargas (
    id BIGSERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    fecha_carga TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    nombre_archivo VARCHAR(255)
);

CREATE TABLE flexis (
    id BIGSERIAL PRIMARY KEY,
    trabajador_id BIGINT NOT NULL REFERENCES trabajadores(id) ON DELETE CASCADE,
    mes INT NOT NULL,
    'año' INT NOT NULL,
    positivas DECIMAL(10,2) DEFAULT 0.0,
    negativas DECIMAL(10,2) DEFAULT 0.0,
    parciales_positivas DECIMAL(10,2) DEFAULT 0.0,
    parciales_negativas DECIMAL(10,2) DEFAULT 0.0,
    UNIQUE(trabajador_id, mes, anio)
);

CREATE TABLE complementarias (
    id BIGSERIAL PRIMARY KEY,
    trabajador_id BIGINT NOT NULL REFERENCES trabajadores(id) ON DELETE CASCADE,
    'año' INT NOT NULL,
    semana INT NOT NULL,
    dias_trabajados INT DEFAULT 0,
    UNIQUE(trabajador_id, anio, semana)
);

CREATE TABLE festivos (
    id BIGSERIAL PRIMARY KEY,
    trabajador_id BIGINT NOT NULL REFERENCES trabajadores(id) ON DELETE CASCADE,
    'año' INT NOT NULL,
    mes INT NOT NULL,
    dias_festivos INT DEFAULT 0,
    UNIQUE(trabajador_id, anio, mes)
);
