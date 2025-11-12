# Ejemplos de Uso de la API F1

Este archivo contiene ejemplos de cómo usar los diferentes endpoints de la API.

## Configuración Inicial

Asegúrate de tener el servidor corriendo:
```bash
npm start
```

## 1. Health Check

Verificar que la API está funcionando:

```bash
curl http://localhost:3000/api/health
```

**Respuesta:**
```json
{
  "status": "OK",
  "message": "API is running"
}
```

---

## 2. Pilotos (Pilots)

### Obtener todos los pilotos

```bash
curl http://localhost:3000/api/pilots
```

### Obtener piloto por ID

```bash
curl http://localhost:3000/api/pilots/PILOT_ID_AQUI
```

### Crear nuevo piloto

```bash
curl -X POST http://localhost:3000/api/pilots \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Lewis",
    "lastName": "Hamilton",
    "nationality": "British",
    "number": 44,
    "teamId": "mercedes-team-id",
    "birthDate": "1985-01-07",
    "championships": 7,
    "podiums": 197,
    "points": 4574,
    "active": true
  }'
```

### Actualizar piloto

```bash
curl -X PUT http://localhost:3000/api/pilots/PILOT_ID_AQUI \
  -H "Content-Type: application/json" \
  -d '{
    "points": 4600,
    "podiums": 198
  }'
```

### Eliminar piloto

```bash
curl -X DELETE http://localhost:3000/api/pilots/PILOT_ID_AQUI
```

### Obtener pilotos por equipo

```bash
curl http://localhost:3000/api/pilots/team/TEAM_ID_AQUI
```

---

## 3. Equipos (Teams)

### Obtener todos los equipos

```bash
curl http://localhost:3000/api/teams
```

### Crear nuevo equipo

```bash
curl -X POST http://localhost:3000/api/teams \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mercedes-AMG Petronas F1 Team",
    "base": "Brackley, United Kingdom",
    "teamChief": "Toto Wolff",
    "technicalChief": "James Allison",
    "chassis": "W14",
    "powerUnit": "Mercedes",
    "firstEntry": 2010,
    "worldChampionships": 8,
    "polePositions": 128,
    "fastestLaps": 82,
    "active": true
  }'
```

### Actualizar equipo

```bash
curl -X PUT http://localhost:3000/api/teams/TEAM_ID_AQUI \
  -H "Content-Type: application/json" \
  -d '{
    "worldChampionships": 9,
    "chassis": "W15"
  }'
```

### Eliminar equipo

```bash
curl -X DELETE http://localhost:3000/api/teams/TEAM_ID_AQUI
```

---

## 4. Carreras (Races)

### Obtener todas las carreras

```bash
curl http://localhost:3000/api/races
```

### Obtener carreras por temporada

```bash
curl http://localhost:3000/api/races?season=2024
```

### Crear nueva carrera

```bash
curl -X POST http://localhost:3000/api/races \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bahrain Grand Prix",
    "circuit": "Bahrain International Circuit",
    "country": "Bahrain",
    "city": "Sakhir",
    "date": "2024-03-02",
    "season": 2024,
    "round": 1,
    "laps": 57,
    "distance": 308.238,
    "circuitLength": 5.412,
    "completed": false
  }'
```

### Actualizar carrera (marcar como completada con ganador)

```bash
curl -X PUT http://localhost:3000/api/races/RACE_ID_AQUI \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true,
    "winner": "Max Verstappen",
    "polePosition": "Max Verstappen",
    "fastestLap": "Sergio Perez"
  }'
```

### Eliminar carrera

```bash
curl -X DELETE http://localhost:3000/api/races/RACE_ID_AQUI
```

---

## Usando Postman

Si prefieres usar Postman, puedes importar estos ejemplos:

1. Crear una nueva colección llamada "F1 API"
2. Agregar las siguientes variables de entorno:
   - `base_url`: `http://localhost:3000`
   - `pilot_id`: (se llenará después de crear un piloto)
   - `team_id`: (se llenará después de crear un equipo)
   - `race_id`: (se llenará después de crear una carrera)

3. Crear las peticiones según los ejemplos de arriba

---

## Usando JavaScript (Fetch API)

### Ejemplo en el navegador o Node.js:

```javascript
// Obtener todos los pilotos
fetch('http://localhost:3000/api/pilots')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Crear nuevo piloto
fetch('http://localhost:3000/api/pilots', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Charles',
    lastName: 'Leclerc',
    nationality: 'Monegasque',
    number: 16,
    teamId: 'ferrari-team-id',
    birthDate: '1997-10-16',
    championships: 0,
    podiums: 28,
    points: 1056,
    active: true
  })
})
  .then(response => response.json())
  .then(data => console.log('Piloto creado:', data))
  .catch(error => console.error('Error:', error));
```

---

## Usando Axios

```javascript
const axios = require('axios');

const baseURL = 'http://localhost:3000/api';

// Obtener todos los equipos
async function getTeams() {
  try {
    const response = await axios.get(`${baseURL}/teams`);
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
}

// Crear nueva carrera
async function createRace() {
  try {
    const response = await axios.post(`${baseURL}/races`, {
      name: 'Spanish Grand Prix',
      circuit: 'Circuit de Barcelona-Catalunya',
      country: 'Spain',
      city: 'Barcelona',
      date: '2024-06-23',
      season: 2024,
      round: 10,
      laps: 66,
      distance: 307.104,
      circuitLength: 4.657,
      completed: false
    });
    console.log('Carrera creada:', response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
}
```

---

## Respuestas Esperadas

### Éxito (200/201)
```json
{
  "success": true,
  "message": "Pilot created successfully",
  "data": {
    "id": "abc123",
    "name": "Lewis",
    "lastName": "Hamilton",
    ...
  }
}
```

### Error de Validación (400)
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    "\"number\" must be a number"
  ]
}
```

### No Encontrado (404)
```json
{
  "success": false,
  "message": "Pilot not found"
}
```

### Error del Servidor (500)
```json
{
  "success": false,
  "message": "Internal Server Error",
  "error": {}
}
```
