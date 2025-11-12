const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración del proyecto F1 API...\n');

const checks = [];

// 1. Verificar estructura de carpetas
const folders = [
  'src',
  'src/config',
  'src/controllers',
  'src/models',
  'src/routes',
  'src/validators'
];

console.log('📁 Verificando estructura de carpetas...');
folders.forEach(folder => {
  const folderPath = path.join(__dirname, folder);
  if (fs.existsSync(folderPath)) {
    console.log(`✅ ${folder}`);
    checks.push(true);
  } else {
    console.log(`❌ ${folder} - NO EXISTE`);
    checks.push(false);
  }
});

// 2. Verificar archivos principales
console.log('\n📄 Verificando archivos principales...');
const files = [
  'src/index.js',
  'src/config/firebase.config.js',
  'src/config/paths.config.js',
  'src/controllers/champions.controller.js',
  'src/models/champion.model.js',
  'src/routes/champions.routes.js',
  'src/validators/champion.validator.js',
  'recursos/campeones_f1.json',
  'package.json',
  '.gitignore',
  'README.md'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
    checks.push(true);
  } else {
    console.log(`❌ ${file} - NO EXISTE`);
    checks.push(false);
  }
});

// 3. Verificar dependencias
console.log('\n📦 Verificando dependencias en package.json...');
const packageJson = require('./package.json');
const requiredDeps = ['express', 'firebase-admin', 'cors', 'joi'];
requiredDeps.forEach(dep => {
  if (packageJson.dependencies && packageJson.dependencies[dep]) {
    console.log(`✅ ${dep} - ${packageJson.dependencies[dep]}`);
    checks.push(true);
  } else {
    console.log(`❌ ${dep} - NO INSTALADO`);
    checks.push(false);
  }
});

// 4. Verificar node_modules
console.log('\n📚 Verificando node_modules...');
if (fs.existsSync(path.join(__dirname, 'node_modules'))) {
  console.log('✅ node_modules existe');
  checks.push(true);
} else {
  console.log('❌ node_modules NO EXISTE - Ejecuta: npm install');
  checks.push(false);
}

// 5. Verificar archivo de configuración de Firebase
console.log('\n🔥 Verificando configuración de Firebase...');
if (fs.existsSync(path.join(__dirname, 'serviceAccountKey.json'))) {
  console.log('✅ serviceAccountKey.json existe');
  checks.push(true);
  
  try {
    const serviceAccount = require('./serviceAccountKey.json');
    if (serviceAccount.project_id && serviceAccount.private_key && serviceAccount.client_email) {
      console.log('✅ serviceAccountKey.json tiene la estructura correcta');
      console.log(`   Project ID: ${serviceAccount.project_id}`);
      checks.push(true);
    } else {
      console.log('⚠️  serviceAccountKey.json existe pero puede estar incompleto');
      checks.push(false);
    }
  } catch (error) {
    console.log('⚠️  Error al leer serviceAccountKey.json');
    checks.push(false);
  }
} else {
  console.log('⚠️  serviceAccountKey.json NO EXISTE');
  console.log('   Necesitas descargar las credenciales de Firebase Console');
  console.log('   y guardarlas como serviceAccountKey.json en la raíz del proyecto');
  checks.push(false);
}

// 6. Verificar archivo .env
console.log('\n⚙️  Verificando variables de entorno...');
if (fs.existsSync(path.join(__dirname, '.env'))) {
  console.log('✅ .env existe');
  checks.push(true);
} else {
  console.log('⚠️  .env NO EXISTE (opcional)');
  console.log('   Puedes copiar .env.example a .env si necesitas configurar variables');
}

// Resumen
console.log('\n' + '='.repeat(60));
const passed = checks.filter(c => c).length;
const total = checks.length;
const percentage = ((passed / total) * 100).toFixed(1);

console.log(`\n📊 RESUMEN: ${passed}/${total} verificaciones pasadas (${percentage}%)\n`);

if (percentage >= 90) {
  console.log('🎉 ¡Excelente! Tu proyecto está correctamente configurado.');
  console.log('\n📝 Próximos pasos:');
  console.log('   1. Asegúrate de tener serviceAccountKey.json configurado');
  console.log('   2. Ejecuta: npm start');
  console.log('   3. Visita: http://localhost:3000/api/health');
  console.log('   4. Lee API_EXAMPLES.md para ejemplos de uso');
} else if (percentage >= 70) {
  console.log('⚠️  Tu proyecto está casi listo, pero faltan algunas configuraciones.');
  console.log('   Revisa los elementos marcados con ❌ arriba.');
} else {
  console.log('❌ Tu proyecto necesita atención. Revisa los errores arriba.');
  console.log('   Ejecuta: npm install');
}

console.log('\n' + '='.repeat(60) + '\n');
