# Real Estate API

API REST para gestion de propiedades inmobiliarias, construida con Express, PostgreSQL/Supabase, Sequelize, JWT y una Clean Architecture simplificada.

## Tecnologias

- Node.js y Express.
- PostgreSQL o Supabase.
- Sequelize como ORM.
- JWT para autenticacion.
- Joi para validaciones.
- bcryptjs para hash de passwords.
- dotenv para variables de entorno.

## Instalacion

```bash
npm install
```

Crea un archivo `.env` tomando como base `.env.example`.

```env
PORT=3000
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=1h
```

Ejecutar en desarrollo:

```bash
npm run dev
```

Ejecutar en produccion:

```bash
npm start
```

Cuando el servidor este activo, la API queda disponible en:

```text
http://localhost:3000
```

## Usuario de prueba

Al arrancar el servidor se crea automaticamente un usuario admin si no existe.

```json
{
  "email": "admin@test.com",
  "password": "123456"
}
```

Este usuario se usa para hacer login y obtener el token JWT. El proyecto no tiene endpoint de registro de usuarios.

## Endpoints

| Metodo | Ruta | Acceso |
|---|---|---|
| `GET` | `/` | Publica |
| `POST` | `/api/v1/auth/login` | Publica |
| `GET` | `/api/v1/properties` | Publica |
| `GET` | `/api/v1/properties/:id` | Publica |
| `POST` | `/api/v1/properties` | Privada |
| `PUT` | `/api/v1/properties/:id` | Privada |
| `DELETE` | `/api/v1/properties/:id` | Privada |

Las rutas privadas requieren:

```text
Authorization: Bearer JWT_TOKEN
```

## Entorno de pruebas con Postman

Antes de probar, asegurese de tener:

- Node.js instalado.
- Dependencias instaladas con `npm install`.
- `.env` configurado.
- Base de datos PostgreSQL o Supabase funcionando.
- Servidor ejecutandose con `npm run dev`.
- Postman instalado.

Base URL:

```text
http://localhost:3000
```

### 1. Verificar que la API esta activa

Metodo:

```text
GET
```

URL:

```text
http://localhost:3000/
```

Respuesta esperada:

```json
{
  "message": "Real Estate API is running"
}
```

### 2. Login

Metodo:

```text
POST
```

URL:

```text
http://localhost:3000/api/v1/auth/login
```

Headers:

```text
Content-Type: application/json
```

Body:

```json
{
  "email": "admin@test.com",
  "password": "123456"
}
```

Respuesta esperada:

```json
{
  "token": "JWT_TOKEN_GENERADO"
}
```

Copie el valor de `token`. Se usara en las rutas privadas.

### 3. Listar propiedades

Metodo:

```text
GET
```

URL:

```text
http://localhost:3000/api/v1/properties
```

Respuesta esperada si no hay datos:

```json
{
  "data": [],
  "total": 0,
  "page": 1,
  "limit": 10
}
```

### 4. Listar propiedades con filtros

Metodo:

```text
GET
```

URL:

```text
http://localhost:3000/api/v1/properties?location=Medellin&minPrice=100000000&maxPrice=500000000&page=1&limit=5
```

Parametros disponibles:

| Parametro | Descripcion |
|---|---|
| `location` | Filtra por ubicacion. |
| `minPrice` | Precio minimo. |
| `maxPrice` | Precio maximo. |
| `page` | Pagina. Por defecto `1`. |
| `limit` | Resultados por pagina. Por defecto `10`, maximo `100`. |

### 5. Crear propiedad

Metodo:

```text
POST
```

URL:

```text
http://localhost:3000/api/v1/properties
```

Headers:

```text
Content-Type: application/json
Authorization: Bearer JWT_TOKEN_GENERADO
```

Body:

```json
{
  "title": "Apartamento en Medellin",
  "price": 250000000,
  "location": "Medellin",
  "available": true
}
```

Respuesta esperada:

```json
{
  "id": 1,
  "title": "Apartamento en Medellin",
  "price": 250000000,
  "location": "Medellin",
  "available": true
}
```

Codigo esperado:

```text
201 Created
```

### 6. Buscar propiedad por id

Metodo:

```text
GET
```

URL:

```text
http://localhost:3000/api/v1/properties/1
```

Respuesta esperada:

```json
{
  "id": 1,
  "title": "Apartamento en Medellin",
  "price": 250000000,
  "location": "Medellin",
  "available": true
}
```

Si la propiedad no existe:

```json
{
  "message": "Property not found"
}
```

### 7. Actualizar propiedad

Metodo:

```text
PUT
```

URL:

```text
http://localhost:3000/api/v1/properties/1
```

Headers:

```text
Content-Type: application/json
Authorization: Bearer JWT_TOKEN_GENERADO
```

Body:

```json
{
  "price": 280000000,
  "available": false
}
```

Respuesta esperada:

```json
{
  "id": 1,
  "title": "Apartamento en Medellin",
  "price": 280000000,
  "location": "Medellin",
  "available": false
}
```

### 8. Eliminar propiedad

Metodo:

```text
DELETE
```

URL:

```text
http://localhost:3000/api/v1/properties/1
```

Headers:

```text
Authorization: Bearer JWT_TOKEN_GENERADO
```

Respuesta esperada:

```json
{
  "message": "Property deleted successfully",
  "data": {
    "id": 1,
    "title": "Apartamento en Medellin",
    "price": 280000000,
    "location": "Medellin",
    "available": false
  }
}
```

## Pruebas de error recomendadas

### Crear propiedad sin token

Metodo:

```text
POST
```

URL:

```text
http://localhost:3000/api/v1/properties
```

Respuesta esperada:

```json
{
  "message": "Authorization header is required"
}
```

### Crear propiedad con datos invalidos

Metodo:

```text
POST
```

URL:

```text
http://localhost:3000/api/v1/properties
```

Headers:

```text
Content-Type: application/json
Authorization: Bearer JWT_TOKEN_GENERADO
```

Body:

```json
{
  "title": "",
  "price": -100,
  "location": ""
}
```

Respuesta esperada:

```json
{
  "message": "Validation error",
  "details": [
    "\"title\" is not allowed to be empty",
    "\"price\" must be a positive number",
    "\"location\" is not allowed to be empty"
  ]
}
```

### Buscar propiedad inexistente

Metodo:

```text
GET
```

URL:

```text
http://localhost:3000/api/v1/properties/99999
```

Respuesta esperada:

```json
{
  "message": "Property not found"
}
```

### Ruta inexistente

Metodo:

```text
GET
```

URL:

```text
http://localhost:3000/api/v1/ruta-inexistente
```

Respuesta esperada:

```json
{
  "message": "Route not found"
}
```

## Orden recomendado para sustentar

1. `GET http://localhost:3000/`
2. `POST http://localhost:3000/api/v1/auth/login`
3. `GET http://localhost:3000/api/v1/properties`
4. `POST http://localhost:3000/api/v1/properties`
5. `GET http://localhost:3000/api/v1/properties/1`
6. `GET http://localhost:3000/api/v1/properties?location=Medellin&minPrice=100000000&maxPrice=500000000&page=1&limit=5`
7. `PUT http://localhost:3000/api/v1/properties/1`
8. `DELETE http://localhost:3000/api/v1/properties/1`

## Arquitectura

El proyecto usa Clean Architecture simplificada. La idea principal es separar la logica del negocio de los detalles tecnicos como Express, Sequelize o JWT.

```text
interfaces/http -> application -> domain
                       |
                       v
                 infrastructure
```

### Capas principales

- `domain`: entidades puras (`User`, `Property`) y contratos de repositorio.
- `application`: casos de uso y servicios de aplicacion.
- `infrastructure`: Sequelize, modelos, conexion a base de datos y repositorios concretos.
- `interfaces/http`: rutas, controllers, middlewares, validaciones y errores HTTP.
- `container.js`: conecta las dependencias de todas las capas.

### Flujo de una peticion

```text
Cliente/Postman
  -> Route
  -> Middleware
  -> Controller
  -> Use Case
  -> Repository
  -> Sequelize Model
  -> PostgreSQL/Supabase
```

## Notas

- No existe endpoint para registrar usuarios.
- El usuario admin se crea automaticamente al iniciar el servidor.
- Las rutas privadas requieren token JWT.
- Si aparece `Route not found`, revise metodo, URL y prefijo `/api/v1`.
- Si falla la conexion a base de datos, revise `DATABASE_URL`, Supabase/PostgreSQL y la conexion a internet.
