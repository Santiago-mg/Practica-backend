# Real Estate API

API REST para un sistema de gestion de propiedades tipo Real Estate.

## Tecnologias

- Node.js: entorno de ejecucion.
- Express: servidor HTTP y rutas.
- PostgreSQL: base de datos relacional.
- Supabase: proveedor de PostgreSQL en la nube.
- Sequelize: ORM para trabajar con modelos.
- JWT: autenticacion por token.
- Joi: validacion de body, params y query.
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
```

En Supabase usa la URL de conexion PostgreSQL del proyecto.

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
{
  "email": "admin@test.com",
  "password": "123456"
}
```

## Obtener token

```http
POST /api/v1/auth/login
```

```json
{
  "email": "admin@test.com",
  "password": "123456"
}
```

Respuesta:

```json
{
  "token": "JWT_TOKEN"
}
```

Usa el token en rutas privadas:

```http
Authorization: Bearer JWT_TOKEN
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

## Crear propiedad

```http
POST /api/v1/properties
Authorization: Bearer JWT_TOKEN
```

```json
{
  "title": "Apartamento en Medellin",
  "price": 350000000,
  "location": "El Poblado",
  "available": true
}
```

## Filtros y paginacion

```http
GET /api/v1/properties?location=Medellin&minPrice=100000000&maxPrice=500000000&page=1&limit=5
```

Respuesta:

```json
{
  "data": [],
  "total": 50,
  "page": 1,
  "limit": 5
}
```

## Validaciones

- Body: `title`, `price`, `location`, `available`.
- Params: `id` debe ser numero positivo.
- Query: `location`, `minPrice`, `maxPrice`, `page`, `limit`.

## Errores

- `400`: datos invalidos.
- `401`: no autorizado.
- `404`: recurso o ruta no encontrada.
- `500`: error interno.

## Arquitectura

```text
Cliente -> Ruta -> Middleware -> Controller -> Service -> Modelo -> PostgreSQL -> Respuesta
```

Carpetas:

- `config`: conexion a base de datos.
- `controllers`: reciben request y response.
- `routes`: definen endpoints.
- `services`: logica de negocio.
- `models`: tablas Sequelize.
- `middlewares`: JWT, validaciones y errores.
- `validations`: esquemas Joi.
- `utils`: utilidades.

## Decisiones tecnicas

Se usa Sequelize como ORM para evitar SQL manual en operaciones comunes. Supabase provee PostgreSQL en la nube. JWT protege las rutas que modifican datos. Joi valida entradas antes de llegar al controller.

## Como probar

1. Configura `.env`.
2. Ejecuta `npm run dev`.
3. Haz login en `/api/v1/auth/login`.
4. Copia el token.
5. Consulta propiedades con `GET /api/v1/properties`.
6. Crea, actualiza o elimina propiedades enviando `Authorization: Bearer JWT_TOKEN`.
