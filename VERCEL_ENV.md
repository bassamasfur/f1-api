# Variables de Entorno para Vercel

Para desplegar correctamente en Vercel, necesitas configurar las siguientes variables de entorno:

## 🔐 Credenciales de Firebase

Debes copiar el contenido completo del archivo `datosf1-firebase-adminsdk-fbsvc-49ca0fad65.json` y pegarlo como una sola línea en la variable de entorno.

### Opción 1: Usar el archivo JSON completo (Recomendado)

1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agrega esta variable:

```
Nombre: FIREBASE_SERVICE_ACCOUNT
Valor: {todo el contenido del JSON en una sola línea}
```

### Opción 2: Variables individuales

Si prefieres usar variables separadas, configura estas:

```
FIREBASE_PROJECT_ID=datosf1
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@datosf1.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

**⚠️ IMPORTANTE:** 
- La `FIREBASE_PRIVATE_KEY` debe incluir los saltos de línea como `\n`
- Debe estar entre comillas dobles
- No debe estar en el repositorio Git

## 🌍 Variables Opcionales

```
NODE_ENV=production
PORT=3000
```

## 📝 Cómo Configurar en Vercel

### Desde la Web UI:
1. Ve a https://vercel.com/dashboard
2. Selecciona tu proyecto
3. Ve a Settings → Environment Variables
4. Agrega cada variable con su valor
5. Selecciona el entorno: Production, Preview, Development

### Desde CLI:
```bash
vercel env add FIREBASE_SERVICE_ACCOUNT production
# Pega el contenido del JSON cuando te lo pida
```

## 🔒 Seguridad

- **NUNCA** subas archivos de credenciales a Git
- Agrega `*.json` al `.gitignore` (ya configurado)
- Las variables de entorno en Vercel están encriptadas
- Solo los administradores del proyecto pueden verlas

## ✅ Verificar Configuración

Después del deploy, prueba estos endpoints:

```
GET https://tu-proyecto.vercel.app/api/health
GET https://tu-proyecto.vercel.app/api/champions/verificar-conexion
```

Si `verificar-conexion` devuelve éxito, las credenciales están correctamente configuradas.
