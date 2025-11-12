# 🚀 Guía de Inicio Rápido - F1 API

Esta guía te ayudará a poner en marcha tu API de Fórmula 1 en minutos.

## ✅ Pre-requisitos

- ✅ Node.js instalado
- ✅ NPM instalado
- ✅ Cuenta de Firebase (gratuita)

## 📝 Pasos para Iniciar

### 1️⃣ Verificar Instalación

Primero, verifica que todo está correctamente configurado:

```bash
npm run check
```

### 2️⃣ Configurar Firebase

#### A. Crear Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Haz clic en "Agregar proyecto"
3. Nombra tu proyecto (ej: "f1-api-proyecto")
4. Sigue los pasos hasta completar

#### B. Habilitar Firestore

1. En tu proyecto de Firebase, ve al menú lateral
2. Haz clic en "Firestore Database"
3. Haz clic en "Crear base de datos"
4. Selecciona "Iniciar en modo de prueba"
5. Elige una ubicación (ej: us-central)
6. Haz clic en "Habilitar"

#### C. Descargar Credenciales

1. Ve a "Configuración del proyecto" (⚙️ en el menú lateral)
2. Selecciona la pestaña "Cuentas de servicio"
3. Haz clic en "Generar nueva clave privada"
4. Se descargará un archivo JSON
5. **Guarda este archivo como `serviceAccountKey.json` en la raíz de tu proyecto**

```
f1-api/
├── src/
├── serviceAccountKey.json  ← AQUÍ
├── package.json
└── ...
```

⚠️ **IMPORTANTE**: Este archivo contiene credenciales sensibles. NUNCA lo subas a GitHub.

### 3️⃣ Iniciar el Servidor

```bash
npm start
```

O para modo desarrollo con auto-recarga:

```bash
npm run dev
```

Deberías ver:

```
🚀 F1 API Server running on port 3000
📍 Health check: http://localhost:3000/api/health
✅ Firebase Admin SDK initialized successfully
```

### 4️⃣ Probar la API

Abre tu navegador y ve a:

```
http://localhost:3000/api/health
```

Deberías ver:

```json
{
  "status": "OK",
  "message": "API is running"
}
```

## 🎯 Primeros Pasos con la API

### Crear tu Primer Equipo

Abre Postman, Insomnia, o usa curl:

```bash
curl -X POST http://localhost:3000/api/teams \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Red Bull Racing",
    "base": "Milton Keynes, United Kingdom",
    "teamChief": "Christian Horner",
    "technicalChief": "Pierre Waché",
    "chassis": "RB19",
    "powerUnit": "Red Bull Powertrains",
    "firstEntry": 2005,
    "worldChampionships": 6,
    "active": true
  }'
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Team created successfully",
  "data": {
    "id": "xyz123...",
    "name": "Red Bull Racing",
    ...
  }
}
```

### Crear tu Primer Piloto

**IMPORTANTE**: Necesitas el `id` del equipo que acabas de crear (el campo `id` en la respuesta anterior).

```bash
curl -X POST http://localhost:3000/api/pilots \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Max",
    "lastName": "Verstappen",
    "nationality": "Dutch",
    "number": 1,
    "teamId": "xyz123...",
    "birthDate": "1997-09-30",
    "championships": 3,
    "podiums": 98,
    "points": 2586,
    "active": true
  }'
```

### Ver Todos los Pilotos

```bash
curl http://localhost:3000/api/pilots
```

### Ver Todos los Equipos

```bash
curl http://localhost:3000/api/teams
```

## 📚 Recursos Adicionales

- **README.md**: Documentación completa del proyecto
- **API_EXAMPLES.md**: Más ejemplos de uso de la API
- **ARCHITECTURE.md**: Explicación detallada de la arquitectura MVC

## 🐛 Solución de Problemas

### Error: "Cannot find module 'joi'"

```bash
npm install joi --save
```

### Error: "Firebase Admin SDK initialization error"

- Verifica que `serviceAccountKey.json` existe en la raíz del proyecto
- Verifica que el archivo JSON tiene la estructura correcta
- Asegúrate de haber descargado el archivo correcto de Firebase Console

### Error: "Port 3000 is already in use"

Cambia el puerto en el archivo `.env`:

```bash
# Crea el archivo .env
echo "PORT=3001" > .env
```

O usa:

```bash
PORT=3001 npm start
```

### Error: "ECONNREFUSED" al hacer peticiones

- Asegúrate de que el servidor está corriendo (`npm start`)
- Verifica que estás usando la URL correcta: `http://localhost:3000`

## 🔥 Verificar Firebase

Para verificar que Firebase está correctamente configurado, puedes ir a:

1. [Firebase Console](https://console.firebase.google.com)
2. Selecciona tu proyecto
3. Ve a "Firestore Database"
4. Después de crear equipos y pilotos, deberías ver las colecciones:
   - `teams`
   - `pilots`
   - `races` (cuando crees carreras)

## 🎉 ¡Listo!

Tu API está funcionando. Ahora puedes:

- ✅ Crear, leer, actualizar y eliminar pilotos
- ✅ Crear, leer, actualizar y eliminar equipos
- ✅ Crear, leer, actualizar y eliminar carreras
- ✅ Filtrar pilotos por equipo
- ✅ Filtrar carreras por temporada

## 📞 ¿Necesitas Ayuda?

1. Revisa **README.md** para documentación completa
2. Revisa **API_EXAMPLES.md** para más ejemplos
3. Verifica los logs en la consola donde ejecutaste `npm start`
4. Asegúrate de que todas las dependencias están instaladas: `npm install`

## 🚀 Próximos Pasos

- Implementa autenticación con JWT
- Agrega más validaciones
- Crea relaciones entre colecciones
- Deploy a producción (Heroku, Railway, Google Cloud)
- Agrega documentación Swagger

---

**¡Feliz desarrollo! 🏎️💨**
