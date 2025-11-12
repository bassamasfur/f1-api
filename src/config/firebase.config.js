const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// Initialize Firebase Admin SDK
let db;

const initializeFirebase = () => {
  try {
    let serviceAccount;

    // Prioridad 1: Variable de entorno (para Vercel)
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      console.log('ℹ️  Usando credenciales desde variable de entorno');
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    }
    // Prioridad 2: Variables individuales (alternativa para Vercel)
    else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
      console.log('ℹ️  Usando credenciales individuales desde variables de entorno');
      serviceAccount = {
        type: "service_account",
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL
      };
    }
    // Prioridad 3: Archivo local (para desarrollo)
    else {
      console.log('ℹ️  Usando credenciales desde archivo local');
      let serviceAccountPath = path.join(__dirname, '../../serviceAccountKey.json');
      
      // Si no existe, busca el archivo existente en el proyecto
      if (!fs.existsSync(serviceAccountPath)) {
        const existingFile = path.join(__dirname, '../../datosf1-firebase-adminsdk-fbsvc-49ca0fad65.json');
        if (fs.existsSync(existingFile)) {
          serviceAccountPath = existingFile;
          console.log('ℹ️  Usando archivo de credenciales existente');
        }
      }
      
      serviceAccount = require(serviceAccountPath);
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });

    db = admin.firestore();
    console.log('✅ Firebase Admin SDK initialized successfully');
    
    return db;
  } catch (error) {
    console.error('❌ Error initializing Firebase Admin SDK:', error);
    throw error;
  }
};

const getFirestore = () => {
  if (!db) {
    db = initializeFirebase();
  }
  return db;
};

module.exports = {
  initializeFirebase,
  getFirestore,
  admin
};
