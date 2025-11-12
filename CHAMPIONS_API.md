# 🏆 Endpoints de Campeones F1 - Guía de Uso

## Nuevos Endpoints Agregados

Se han agregado 3 endpoints principales para trabajar con campeones de F1:

---

## 1️⃣ Verificar Conexión a Firebase

**Endpoint:** `GET /api/champions/verificar-conexion`

**Descripción:** Verifica que la conexión a Firebase está funcionando correctamente.

### Ejemplo con curl:
```bash
curl http://localhost:3000/api/champions/verificar-conexion
```

### Ejemplo con JavaScript:
```javascript
fetch('http://localhost:3000/api/champions/verificar-conexion')
  .then(response => response.json())
  .then(data => console.log(data));
```

### Respuesta Exitosa:
```json
{
  "success": true,
  "message": "Conexión a Firebase exitosa",
  "firebase": {
    "connected": true,
    "projectId": "datosf1",
    "timestamp": "2025-11-11T20:30:00.000Z"
  }
}
```

---

## 2️⃣ Cargar Archivo JSON Completo de Campeones

**Endpoint:** `POST /api/champions/cargar-campeones`

**Descripción:** Carga todos los campeones desde el archivo `recursos/campeones_f1.json` a Firebase.

**⚠️ IMPORTANTE:** Este endpoint **SIEMPRE elimina todos los registros existentes** antes de cargar los nuevos datos.

### Ejemplo con curl:
```bash
curl -X POST http://localhost:3000/api/champions/cargar-campeones
```

### Ejemplo con JavaScript:
```javascript
fetch('http://localhost:3000/api/champions/cargar-campeones', {
  method: 'POST'
})
  .then(response => response.json())
  .then(data => console.log(data));
```

### Respuesta Exitosa:
```json
{
  "success": true,
  "message": "Colección limpiada y 74 campeones cargados exitosamente",
  "data": {
    "deleted": 74,
    "loaded": 74,
    "champions": [
      {
        "id": "abc123...",
        "year": 1950,
        "nombre": "Giuseppe",
        "apellido": "Farina",
        "pais": "Italy",
        "equipo": "Alfa Romeo",
        "victorias": 3,
        "puntos": 30
      },
      // ... más campeones
    ]
  }
}
```

---

## 3️⃣ Cargar un Solo Campeón

**Endpoint:** `POST /api/champions/cargar-campeon`

**Descripción:** Carga un único campeón a la base de datos.

### Body (JSON):
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

### Ejemplo con curl:
```bash
curl -X POST http://localhost:3000/api/champions/cargar-campeon \
  -H "Content-Type: application/json" \
  -d '{
    "year": 2024,
    "nombre": "Max",
    "apellido": "Verstappen",
    "pais": "Netherlands",
    "equipo": "Red Bull Racing",
    "victorias": 19,
    "puntos": 575
  }'
```

### Ejemplo con JavaScript:
```javascript
fetch('http://localhost:3000/api/champions/cargar-campeon', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    year: 2024,
    nombre: 'Max',
    apellido: 'Verstappen',
    pais: 'Netherlands',
    equipo: 'Red Bull Racing',
    victorias: 19,
    puntos: 575
  })
})
  .then(response => response.json())
  .then(data => console.log(data));
```

### Respuesta Exitosa:
```json
{
  "success": true,
  "message": "Campeón creado exitosamente",
  "data": {
    "id": "xyz789...",
    "year": 2024,
    "nombre": "Max",
    "apellido": "Verstappen",
    "pais": "Netherlands",
    "equipo": "Red Bull Racing",
    "victorias": 19,
    "puntos": 575,
    "createdAt": {...},
    "updatedAt": {...}
  }
}
```

### Respuesta de Error (Año duplicado):
```json
{
  "success": false,
  "message": "Ya existe un campeón para el año 2024",
  "data": {
    "id": "xyz789...",
    "year": 2024,
    "nombre": "Max",
    "apellido": "Verstappen",
    ...
  }
}
```

---

## 📊 Endpoints Adicionales (CRUD Completo)

### Obtener Todos los Campeones
```bash
GET /api/champions
```

### Obtener Campeón por ID
```bash
GET /api/champions/:id
```

### Obtener Campeón por Año
```bash
GET /api/champions/year/2023
```

### Actualizar Campeón
```bash
PUT /api/champions/:id
```

### Eliminar Campeón
```bash
DELETE /api/champions/:id
```

---

## 🔄 Flujo de Trabajo Recomendado

### Opción 1: Carga Inicial de Datos
```bash
# 1. Verificar conexión
curl http://localhost:3000/api/champions/verificar-conexion

# 2. Cargar todos los campeones (borra y recarga automáticamente)
curl -X POST http://localhost:3000/api/champions/cargar-campeones

# 3. Verificar que se cargaron
curl http://localhost:3000/api/champions
```

### Opción 2: Agregar Nuevo Campeón
```bash
# 1. Verificar conexión
curl http://localhost:3000/api/champions/verificar-conexion

# 2. Cargar un campeón individual
curl -X POST http://localhost:3000/api/champions/cargar-campeon \
  -H "Content-Type: application/json" \
  -d '{"year":2024,"nombre":"Max","apellido":"Verstappen",...}'

# 3. Verificar por año
curl http://localhost:3000/api/champions/year/2024
```

---

## ⚠️ Validaciones

El sistema valida automáticamente:

- ✅ **year**: Número entero entre 1950 y 2100 (requerido)
- ✅ **nombre**: String de 2-100 caracteres (requerido)
- ✅ **apellido**: String de 2-100 caracteres (requerido)
- ✅ **pais**: String de 2-100 caracteres (requerido)
- ✅ **equipo**: String de 2-100 caracteres (requerido)
- ✅ **victorias**: Número entero >= 0 (requerido)
- ✅ **puntos**: Número >= 0 (requerido)

### Ejemplo de Error de Validación:
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    "\"year\" must be a number",
    "\"nombre\" is required"
  ]
}
```

---

## 📝 Notas Importantes

1. **Timestamps Automáticos**: Cada campeón tendrá `createdAt` y `updatedAt` automáticamente
2. **Duplicados por Año**: No se pueden crear dos campeones para el mismo año (con `cargar-campeon`)
3. **Carga Masiva**: Al usar `cargar-campeones`, se validan todos los registros antes de insertar
4. **⚠️ BORRADO AUTOMÁTICO**: El endpoint `cargar-campeones` **SIEMPRE elimina todos los registros** antes de cargar los nuevos datos del archivo JSON
5. **Archivo Fuente**: Los datos se cargan desde `recursos/campeones_f1.json`

---

## 🎯 Testing Rápido con Postman

1. **Crear una colección** llamada "Champions F1"
2. **Agregar estas variables**:
   - `base_url`: `http://localhost:3000`
3. **Crear las peticiones**:
   - GET - Verificar Conexión: `{{base_url}}/api/champions/verificar-conexion`
   - POST - Cargar Todos: `{{base_url}}/api/champions/cargar-campeones?clear=true`
   - POST - Cargar Uno: `{{base_url}}/api/champions/cargar-campeon`
   - GET - Ver Todos: `{{base_url}}/api/champions`
   - GET - Ver por Año: `{{base_url}}/api/champions/year/2023`

---

## 🚀 ¡Listo para Usar!

Los endpoints están funcionando y listos para:
- ✅ Verificar la conexión a Firebase
- ✅ Cargar datos masivos desde JSON
- ✅ Cargar campeones individuales
- ✅ Consultar, actualizar y eliminar registros
