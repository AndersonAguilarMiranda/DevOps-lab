# Arquitectura — JornadaCloud v1

## Visión general

    ┌─────────────┐      HTTP/JSON      ┌──────────────┐      JDBC      ┌────────────┐
    │  Frontend   │ ──────────────────► │   Backend    │ ─────────────► │ PostgreSQL │
    │ React + TS  │ ◄────────────────── │ Spring Boot  │ ◄───────────── │            │
    └─────────────┘                     └──────────────┘                └────────────┘
                                               │
                                               │ Flyway
                                               ▼
                                        Migraciones SQL

## Componentes

- **Frontend** (fase posterior): React + TypeScript, interfaz responsive.
- **Backend**: Spring Boot 3.3, API REST, autenticación JWT, roles.
- **Base de datos**: PostgreSQL 16 en Podman, migraciones con Flyway.
- **CI**: GitHub Actions (build + tests contra Postgres de servicio).

## Fuera de alcance en v1

- Floci (emulación AWS) → fase 2 del ecosistema. Motor previsto: AWS Emulator oficial (aws/aws-emulator) en contenedor, vía Podman.
- DeepSeek Harness (auditoría IA) → fase 3.
- Despliegue en AWS real → roadmap.

## Módulos v1

| Módulo | Estado |
|---|---|
| Empleados | commit 5 |
| Auth (usuarios/roles) | commit 6 |
| Fichajes | commit 7 |
| Vacaciones / Solicitudes | commit 8 |

Módulos v2 (Turnos, RRHH, Informes, Auditoría) se planifican tras cerrar v1.
