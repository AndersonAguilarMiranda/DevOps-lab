# DevOps-lab

Aplicación de gestión de jornada laboral: empleados, fichajes, turnos, vacaciones y solicitudes.

**Estado:** v1 en desarrollo.

## Stack

- **Backend:** Java 21 + Spring Boot 3.3 + PostgreSQL + Flyway
- **Frontend:** React + TypeScript (fase posterior)
- **Infra local:** Podman + compose
- **CI:** GitHub Actions

## Estructura del repositorio

    JornadaCloud/
    ├── backend/       Spring Boot (API REST)
    ├── frontend/      React + TypeScript
    ├── database/      Migraciones Flyway y datos ficticios
    ├── docs/          Arquitectura, decisiones y capturas
    └── .github/       Workflows de CI

## Arranque local

> Pendiente de completar en el commit 3 (PostgreSQL + Flyway).

## Documentación

- [Arquitectura](docs/architecture.md)
- [Decisiones técnicas](docs/decisions.md) *(pendiente)*

## Roadmap

- [x] Estructura del monorepo
- [ ] Backend Spring Boot base (commit 2)
- [ ] PostgreSQL + Flyway (commit 3)
- [ ] CI con GitHub Actions (commit 4)
- [ ] Módulo Empleados (commit 5)
- [ ] Auth JWT (commit 6)
- [ ] Módulo Fichajes (commit 7)
- [ ] Módulo Solicitudes (commit 8)
- [ ] Datos ficticios + colección endpoints (commit 9)
- [ ] Documentación v1 + tag (commit 10)
