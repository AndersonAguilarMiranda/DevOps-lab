# 🗺️ Chuleta de Defensa: Proyecto DevOps-lab (dmz2)

## 🎯 1. El "Elevator Pitch" (¿Qué es esto?)
"Es una plataforma Full-Stack para la gestión de jornada laboral. Permite a los supervisores subir datos masivos (CSV) y a los empleados consultar sus balances (flexis, complementarias) mediante una tabla interactiva. Toda la infraestructura está contenerizada y preparada para la nube."

## 🏗️ 2. La Arquitectura (El flujo)
- **Frontend:** React + TypeScript (Vite). Interfaz rápida y tipada.
- **Backend:** Java 21 + Spring Boot 4.1. API REST robusta.
- **Base de Datos:** PostgreSQL 16 (en Podman).
- **Migraciones:** Flyway (la BD está versionada como el código).
- **CI:** GitHub Actions (compila y testea en cada push).

**El flujo:** El usuario interactúa con React (5173) -> React hace un `fetch` -> Spring Boot recibe la petición -> Hibernate lo traduce a SQL -> PostgreSQL (5432) guarda/lee.

## 🛠️ 3. Decisiones Técnicas Clave (Lo que demuestra que sabes)
*Si te preguntan por estas cosas, aquí tienes la respuesta de por qué lo hicimos así:*

- **¿Por qué Java 21 y no el 27 que había?** Spring Boot 4.1 no soporta oficialmente Java 27 todavía. Usamos LTS (Java 21) por estabilidad.
- **¿Por qué Flyway y no dejar que Hibernate cree las tablas?** Porque en producción no puedes dejar que el ORM modifique la BD a su antojo. Flyway controla los cambios con scripts SQL versionados.
- **¿Por qué no usas Lombok?** Porque en Java 27 daba conflictos con el procesador de anotaciones. Escribimos getters/setters manuales.
- **El error del CI:** El archivo `.mvn/jvm.config` apuntaba a una ruta local de mi PC (`/usr/lib/jvm/...`). Al subirlo a GitHub Actions, esa ruta no existía. Se solucionó borrando la config local y dejando que `setup-java` inyecte el JDK 21.
- **CORS:** El navegador bloqueaba la conexión entre React (5173) y Spring (8080). Se solucionó añadiendo `@CrossOrigin(origins = "*")` en el controlador.

## 🚧 4. Problemas encontrados y cómo los resolví (Troubleshooting)
- **El POM corrupto:** Al pegar código en la terminal, se metían caracteres invisibles que rompían Maven. Usamos `cat > archivo << 'EOF'` para evitarlo.
- **"Unsupported Database" en Flyway:** Spring Boot 4 ya no incluye los drivers de BD para Flyway en el paquete básico. Añadimos `flyway-database-postgresql` al POM.
- **Carpeta Vite anidada:** Ejecutamos `npm create vite frontend` dentro de la carpeta `frontend`, creando `frontend/frontend`. Se solucionó moviendo todo un nivel arriba.

## 🚀 5. Próximos pasos (Roadmap)
- **Seguridad:** Añadir autenticación JWT con Spring Security (diferentes roles: Admin vs Empleado).
- **Cloud:** Integrar Floci (AWS Emulator) para que los informes generados se suban automáticamente a un S3 simulado.
- **Frontend:** Dar estilo con CSS/Tailwind e implementar la vista individualizada por ID.

## 🕹️ 6. Comandos vitales (Para demostrar en vivo)
```bash
# 1. Levantar BD
podman-compose up -d

# 2. Arrancar Backend
cd backend && mvn spring-boot:run

# 3. Arrancar Frontend
cd frontend && npm run dev
