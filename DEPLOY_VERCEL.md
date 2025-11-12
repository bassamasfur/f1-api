# Guía de Despliegue en Vercel

## 📋 Pasos para Desplegar

### 1. Preparar el Proyecto

El proyecto ya está configurado con:
- ✅ `vercel.json` - Configuración de rutas
- ✅ `package.json` - Con engines de Node.js
- ✅ `firebase.config.js` - Soporte para variables de entorno
- ✅ `.gitignore` - Archivos de credenciales excluidos

### 2. Iniciar Sesión en Vercel

```bash
vercel login
```

### 3. Desplegar (Primera Vez)

```bash
vercel
```

Te preguntará:
- **Set up and deploy?** → Yes
- **Which scope?** → Selecciona tu cuenta/organización
- **Link to existing project?** → No
- **What's your project's name?** → f1-api (o el nombre que prefieras)
- **In which directory is your code located?** → ./ (presiona Enter)

### 4. Configurar Variables de Entorno

#### Opción A: Desde el Dashboard Web

1. Ve a https://vercel.com/dashboard
2. Selecciona tu proyecto `f1-api`
3. Settings → Environment Variables
4. Agrega esta variable:

```
Key: FIREBASE_SERVICE_ACCOUNT
Value: {contenido completo del archivo datosf1-firebase-adminsdk-fbsvc-49ca0fad65.json}
```

**⚠️ IMPORTANTE:** Copia el contenido del archivo JSON completo, todo en una sola línea.

5. Selecciona los entornos: Production, Preview, Development
6. Haz clic en "Save"

#### Opción B: Desde la CLI

```bash
# Agregar la variable de entorno
vercel env add FIREBASE_SERVICE_ACCOUNT production

# Pega el contenido del JSON cuando te lo pida
# Presiona Ctrl+D (Windows/Linux) o Cmd+D (Mac) cuando termines
```

### 5. Re-Desplegar con las Variables

```bash
vercel --prod
```

### 6. Verificar el Despliegue

Vercel te dará una URL, por ejemplo: `https://f1-api-xxx.vercel.app`

Prueba los endpoints:

```bash
# Health check
curl https://tu-proyecto.vercel.app/api/health

# Verificar Firebase
curl https://tu-proyecto.vercel.app/api/champions/verificar-conexion

# Listar campeones
curl https://tu-proyecto.vercel.app/api/champions
```

## 🔄 Actualizaciones Futuras

Cada vez que hagas cambios en el código:

```bash
# Para production
vercel --prod

# Para preview/testing
vercel
```

## 🎯 Endpoints Disponibles

Una vez desplegado, estos serán tus endpoints:

```
GET  https://tu-proyecto.vercel.app/api/health
GET  https://tu-proyecto.vercel.app/api/champions/verificar-conexion
POST https://tu-proyecto.vercel.app/api/champions/cargar-campeones
POST https://tu-proyecto.vercel.app/api/champions/cargar-campeon
GET  https://tu-proyecto.vercel.app/api/champions
GET  https://tu-proyecto.vercel.app/api/champions/:id
GET  https://tu-proyecto.vercel.app/api/champions/year/:year
PUT  https://tu-proyecto.vercel.app/api/champions/:id
DELETE https://tu-proyecto.vercel.app/api/champions/:id
```

## 🐛 Troubleshooting

### Error: Firebase not initialized
- Verifica que la variable `FIREBASE_SERVICE_ACCOUNT` esté configurada
- Verifica que el JSON esté completo y válido
- Re-despliega con `vercel --prod`

### Error: 404 Not Found
- Verifica que `vercel.json` esté en la raíz del proyecto
- Verifica que las rutas en `vercel.json` sean correctas

### Ver Logs en Tiempo Real
```bash
vercel logs <deployment-url>
```

## 🔒 Seguridad

- ✅ Credenciales en variables de entorno (no en código)
- ✅ `.gitignore` configurado correctamente
- ✅ CORS habilitado para todos los orígenes (ajusta si necesitas restringir)

## 📱 Configurar Dominio Personalizado (Opcional)

1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Domains
3. Agrega tu dominio personalizado
4. Sigue las instrucciones para configurar DNS

## ✅ Checklist Final

- [ ] `vercel login` ejecutado
- [ ] Proyecto inicializado con `vercel`
- [ ] Variable `FIREBASE_SERVICE_ACCOUNT` configurada
- [ ] Desplegado a producción con `vercel --prod`
- [ ] Endpoint `/api/health` responde correctamente
- [ ] Endpoint `/api/champions/verificar-conexion` confirma conexión a Firebase
- [ ] Documentación actualizada con la URL de producción
