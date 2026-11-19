# DevOps-lab (dmz2)

Aplicación de gestión de jornada laboral: empleados, fichajes, turnos, vacaciones y solicitudes.

[![Backend CI](https://github.com/AndersonAguilarMiranda/DevOps-lab/actions/workflows/backend-ci.yml/badge.svg)](https://github.com/AndersonAguilarMiranda/DevOps-lab/actions)

**Estado:** v1 en desarrollo.

## Stack

- **Backend:** Java 21 + Spring Boot 4.1 + PostgreSQL 16 + Flyway
- **Frontend:** React + TypeScript (fase posterior)
- **Infra local:** Podman + compose
- **CI:** GitHub Actions

## Estructura del repositorio

    DevOps-lab/
    ├── backend/       Spring Boot (API REST)
    ├── frontend/      React + TypeScript
    ├── docs/          Arquitectura, decisiones y capturas
    ├── compose.yaml   Infraestructura local (PostgreSQL)
    └── .github/       Workflows de CI

## Arranque local

1. Levantar la base de datos:
   ```bash
   podman-compose up -d
