# F1 API - API de Campeones de Fórmula 1

API RESTful para gestionar información de campeones de Fórmula 1 usando Node.js, Express y Firebase Firestore.

## 🏗️ Arquitectura MVC

Este proyecto sigue el patrón **Model-View-Controller (MVC)** adaptado para APIs REST:

```
f1-api/
├── src/
│   ├── config/           # Configuraciones (Firebase, etc.)
│   ├── controllers/      # Lógica de negocio y manejo de peticiones
│   ├── models/          # Modelos de datos y acceso a Firestore
│   ├── routes/          # Definición de rutas y endpoints
│   ├── validators/      # Validación de datos con Joi
│   └── index.js         # Punto de entrada de la aplicación
├── recursos/            # Datos adicionales (JSON de campeones)
├── .env.example         # Ejemplo de variables de entorno
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Características

- ✅ Arquitectura MVC bien estructurada
- ✅ Integración con Firebase Firestore
- ✅ Validación de datos con Joi
- ✅ Manejo de errores centralizado
- ✅ CORS habilitado
- ✅ RESTful API endpoints
- ✅ Código modular y reutilizable

## 📋 Prerequisitos

- Node.js (v14 o superior)
- NPM o Yarn
- Cuenta de Firebase con Firestore habilitado
- Service Account Key de Firebase

## 🔧 Instalación

1. **Clonar el repositorio**
```bash
cd f1-api
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Instalar Joi para validaciones**
```bash
npm install joi
```

4. **Configurar Firebase**
   - Ve a Firebase Console (https://console.firebase.google.com)
   - Crea un nuevo proyecto o selecciona uno existente
   - Ve a Project Settings > Service Accounts
   - Genera una nueva clave privada
   - Descarga el archivo JSON y guárdalo como `serviceAccountKey.json` en la raíz del proyecto

5. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Edita el archivo `.env` si necesitas cambiar el puerto:
```
PORT=3000
NODE_ENV=development
```

## 🎯 Uso

### Iniciar el servidor

```bash
npm start
```

O para desarrollo con nodemon:
```bash
npm run dev
```

El servidor iniciará en `http://localhost:3000`

## 📚 Endpoints API

### Health Check
```http
GET /api/health
```

### Campeones (Champions)

#### Verificar Conexión a Firebase
```http
GET /api/champions/verificar-conexion
```

#### Cargar Archivo JSON Completo
```http
POST /api/champions/cargar-campeones?clear=true
```

#### Cargar un Solo Campeón
```http
POST /api/champions/cargar-campeon
```

**Ejemplo de payload:**
```json
{
  "year": 2024,
  "nombre": "Max",
  "apellido": "Verstappen",
  "pais": "Netherlands",
  "equipo": "Red Bull Racing",
  "victorias": 19,
  "puntos": 575
}
```

#### CRUD de Campeones
```http
GET    /api/champions           # Obtener todos los campeones
GET    /api/champions/:id       # Obtener campeón por ID
GET    /api/champions/year/:year # Obtener campeón por año
PUT    /api/champions/:id       # Actualizar campeón
DELETE /api/champions/:id       # Eliminar campeón
```

## 🏛️ Estructura del Patrón MVC

```http
GET    /api/pilots              # Obtener todos los pilotos
GET    /api/pilots/:id          # Obtener piloto por ID
GET    /api/pilots/team/:teamId # Obtener pilotos por equipo
POST   /api/pilots              # Crear nuevo piloto
PUT    /api/pilots/:id          # Actualizar piloto
DELETE /api/pilots/:id          # Eliminar piloto
```

**Ejemplo de payload para crear piloto:**
```json
{
  "name": "Max",
  "lastName": "Verstappen",
  "nationality": "Dutch",
  "number": 1,
  "teamId": "team-id-here",
  "birthDate": "1997-09-30",
  "championships": 3,
  "podiums": 98,
  "points": 2586,
  "active": true
}
```

### Equipos (Teams)

```http
GET    /api/teams      # Obtener todos los equipos
GET    /api/teams/:id  # Obtener equipo por ID
POST   /api/teams      # Crear nuevo equipo
PUT    /api/teams/:id  # Actualizar equipo
DELETE /api/teams/:id  # Eliminar equipo
```

**Ejemplo de payload para crear equipo:**
```json
{
  "name": "Red Bull Racing",
  "base": "Milton Keynes, United Kingdom",
  "teamChief": "Christian Horner",
  "technicalChief": "Pierre Waché",
  "chassis": "RB19",
  "powerUnit": "Red Bull Powertrains",
  "firstEntry": 2005,
  "worldChampionships": 6,
  "active": true
}
```

### Carreras (Races)

```http
GET    /api/races             # Obtener todas las carreras
GET    /api/races?season=2024 # Filtrar por temporada
GET    /api/races/:id         # Obtener carrera por ID
POST   /api/races             # Crear nueva carrera
PUT    /api/races/:id         # Actualizar carrera
DELETE /api/races/:id         # Eliminar carrera
```

**Ejemplo de payload para crear carrera:**
```json
{
  "name": "Monaco Grand Prix",
  "circuit": "Circuit de Monaco",
  "country": "Monaco",
  "city": "Monte Carlo",
  "date": "2024-05-26",
  "season": 2024,
  "round": 8,
  "laps": 78,
  "distance": 260.286,
  "circuitLength": 3.337,
  "completed": false
}
```

## 🏛️ Estructura del Patrón MVC

### Models (Modelos)
- `champion.model.js`: Acceso a datos de campeones en Firestore
- Métodos CRUD completos
- Queries personalizadas (buscar por año)
- Timestamps automáticos

### Controllers (Controladores)
- `champions.controller.js`: Lógica de negocio
- 3 endpoints especiales: verificar conexión, cargar archivo JSON, cargar un campeón
- CRUD completo para gestión de campeones
- Validación con Joi

### Routes (Rutas)
- `champions.routes.js`: Definición de todos los endpoints
- Documentación de cada ruta

### Validators (Validadores)
- `champion.validator.js`: Schemas de validación con Joi
- Validación de campos requeridos y tipos de datos

### Config (Configuración)
- `firebase.config.js`: Inicialización de Firebase Admin SDK
- Patrón Singleton para la conexión

## 🛡️ Buenas Prácticas Implementadas

1. **Separación de responsabilidades**: Cada capa tiene una función específica
2. **DRY (Don't Repeat Yourself)**: Código reutilizable
3. **Validación de datos**: Joi valida todos los inputs
4. **Manejo de errores**: Middleware centralizado
5. **Timestamps automáticos**: `createdAt` y `updatedAt`
6. **Respuestas estandarizadas**: Formato consistente
7. **Código asíncrono**: async/await para Firebase
8. **Seguridad**: Credenciales fuera del código fuente

## 📖 Documentación Adicional

- **CHAMPIONS_API.md**: Guía completa de uso de los endpoints
- **QUICK_START.md**: Guía de inicio rápido
- **API_EXAMPLES.md**: Ejemplos de peticiones

## 🔒 Seguridad

- ⚠️ **IMPORTANTE**: Nunca subas el archivo de credenciales de Firebase a GitHub
- El archivo `.gitignore` ya está configurado para ignorarlo
- Usa variables de entorno para información sensible

## 📦 Dependencias Principales

```json
{
  "express": "^5.1.0",
  "firebase-admin": "^13.6.0",
  "cors": "^2.8.5",
  "joi": "^18.0.1"
}
```

## 🚀 Próximos Pasos

- [ ] Implementar autenticación con JWT
- [ ] Agregar middleware de logging
- [ ] Implementar rate limiting
- [ ] Agregar tests unitarios y de integración
- [ ] Documentación con Swagger/OpenAPI
- [ ] Paginación para endpoints GET
- [ ] Deploy a producción

## 📄 Licencia

ISC
