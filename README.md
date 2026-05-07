# Real Estate API

API REST para un sistema de gestion de propiedades tipo Real Estate, refactorizada hacia **Clean Architecture** simplificada.

## Tecnologias

- Node.js: entorno de ejecucion.
- Express: servidor HTTP y rutas.
- PostgreSQL: base de datos relacional.
- Supabase: proveedor de PostgreSQL en la nube.
- Sequelize: ORM (vive solo en la capa de infraestructura).
- JWT: autenticacion por token.
- Joi: validacion de body, params y query.
- bcryptjs: hash de passwords.
- dotenv: variables de entorno.

## Instalacion

```bash
npm install
```

Crea un archivo `.env` tomando como base `.env.example`.

```env
PORT=3000
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=1h
```

## Ejecutar

```bash
npm run dev
```

Produccion:

```bash
npm start
```

## Usuario de prueba

Al arrancar el servidor se crea un usuario admin si no existe:

```json
{ "email": "admin@test.com", "password": "123456" }
```

## Endpoints

| Metodo | Ruta | Acceso |
|---|---|---|
| POST | `/api/v1/auth/login` | Publica |
| GET | `/api/v1/properties` | Publica |
| GET | `/api/v1/properties/:id` | Publica |
| POST | `/api/v1/properties` | Privada |
| PUT | `/api/v1/properties/:id` | Privada |
| DELETE | `/api/v1/properties/:id` | Privada |

Las rutas privadas requieren `Authorization: Bearer JWT_TOKEN`.

## Filtros y paginacion

```http
GET /api/v1/properties?location=Medellin&minPrice=100000000&maxPrice=500000000&page=1&limit=5
```

## Errores

- `400`: datos invalidos.
- `401`: no autorizado.
- `404`: recurso o ruta no encontrada.
- `500`: error interno.

---

## Arquitectura (Clean Architecture simplificada)

La idea principal es que **el dominio no depende de nada** y la **infraestructura depende del dominio**. Las flechas de dependencia siempre apuntan hacia adentro.

```
interfaces/http  ───►  application  ───►  domain
                            │                ▲
                            ▼                │
                      infrastructure  ───────┘
```

### Estructura de carpetas

```text
src/
  domain/
    entities/                  Entidades puras (User, Property)
    repositories/              Interfaces (IUserRepository, IPropertyRepository)
  application/
    use-cases/
      auth/                    LoginUserUseCase
      properties/              GetAll, GetById, Create, Update, Delete
    services/                  PasswordService, TokenService (envuelven bcrypt y jwt)
  infrastructure/
    database/                  sequelize.js, syncModels.js, seedAdminUser.js
    models/                    UserModel, PropertyModel (Sequelize)
    repositories/              SequelizeUserRepository, SequelizePropertyRepository
  interfaces/
    http/
      controllers/             auth.controller, property.controller
      routes/                  auth.routes, property.routes
      middlewares/             auth, error, validation
      validations/             Esquemas Joi
      errors/                  AppError
  config/
    env.js                     Variables de entorno centralizadas
  container.js                 Composition root (inyeccion de dependencias)
  app.js                       Construye la app Express
  server.js                    Arranca conexion DB + sync + seed + server
```

### Que hace cada capa

- **domain**: el corazon. Define que es un User y que es una Property en el negocio. Tambien define que operaciones se pueden pedir contra el repositorio (interfaces). No conoce Express, ni Sequelize, ni JWT.
- **application**: los casos de uso (acciones del sistema). Cada caso de uso recibe sus dependencias por constructor. No accede a `req` ni a `process.env` directamente.
- **infrastructure**: la implementacion tecnica. Aqui vive Sequelize, los modelos de tabla, la conexion y la implementacion concreta de cada repositorio.
- **interfaces/http**: el adaptador HTTP. Controllers, rutas, middlewares de Joi/JWT y manejo de errores.
- **config**: variables de entorno centralizadas en un solo archivo.
- **container.js**: el unico lugar donde se conectan todas las piezas. Leer este archivo es leer el grafo completo del sistema.

### Flujo de un request

```
Cliente
  │
  ▼
Route (Express)
  │
  ▼
Middleware (JWT si la ruta es privada -> Joi para validar input)
  │
  ▼
Controller (interfaces/http)
  │
  ▼
Use Case (application)
  │
  ▼
Repository interface (domain) -> implementacion Sequelize (infrastructure)
  │
  ▼
Sequelize Model -> PostgreSQL
  │
  ▼
Repository devuelve entidad de domain
  │
  ▼
Use Case devuelve resultado al Controller
  │
  ▼
Controller responde JSON al cliente
```

## Que se movio y por que

| Archivo viejo | Archivo nuevo | Por que |
|---|---|---|
| `src/controllers/*` | `src/interfaces/http/controllers/*` | Los controllers son adaptadores HTTP, viven en interfaces. |
| `src/services/auth.service.js` | `src/application/use-cases/auth/LoginUserUseCase.js` + `src/application/services/{Token,Password}Service.js` | El "service" mezclaba caso de uso (login) con utilidades (jwt, bcrypt). Se separan. |
| `src/services/property.service.js` | `src/application/use-cases/properties/*` + `src/infrastructure/repositories/SequelizePropertyRepository.js` | La logica de negocio queda en use cases; los detalles de Sequelize quedan en el repositorio. |
| `src/models/*` | `src/infrastructure/models/*` | Los modelos Sequelize son detalle de infraestructura. |
| `src/models/index.js` (seed) | `src/infrastructure/database/seedAdminUser.js` | El seed es responsabilidad de infraestructura y se inyecta repo + passwordService. |
| `src/routes/*` | `src/interfaces/http/routes/*` | Las rutas pertenecen al adaptador HTTP. |
| `src/middlewares/*` | `src/interfaces/http/middlewares/*` | Idem. |
| `src/validations/*` | `src/interfaces/http/validations/*` | Joi es detalle del HTTP, no del dominio. |
| `src/utils/appError.js` | `src/interfaces/http/errors/AppError.js` | Solo se usa para mapear errores HTTP. |
| `src/config/database.js` | `src/infrastructure/database/sequelize.js` + `src/config/env.js` | Variables y conexion separadas. |

Los stubs viejos marcados como `DEPRECATED` ya fueron eliminados. La estructura activa vive en las capas `domain`, `application`, `infrastructure` e `interfaces/http`.

## Decisiones tecnicas (honestas)

- **No es Clean Architecture pura.** Para un proyecto con 2 entidades, la version pura seria sobreingenieria. Se mantienen las 4 capas pero con archivos cortos y nombres explicitos.
- **El use case de listar propiedades llama directo al repositorio.** No tiene logica de negocio adicional. Existe igual para mantener simetria con el resto y para que la sustentacion sea consistente.
- **`req.validated`** sigue siendo la fuente de la verdad de los inputs ya validados.
- **Los repositorios devuelven entidades de dominio**, no instancias de Sequelize. Por eso veras un metodo privado `_toEntity` en `SequelizePropertyRepository`.

## Como probar

1. Configura `.env`.
2. `npm run dev`.
3. Login en `POST /api/v1/auth/login` con admin/123456.
4. Copia el token.
5. `GET /api/v1/properties` (publico) y `POST/PUT/DELETE` con `Authorization: Bearer TOKEN`.
