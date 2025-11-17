const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const championsRoutes = require('./routes/champions.routes');
const maintenanceRoutes = require('./routes/maintenance.routes');

const victoriasRoutes = require('./routes/victorias.routes');

const victoriasConsecutivasRoutes = require('./routes/victoriasConsecutivas.routes');

app.use('/api/champions', championsRoutes);
app.use('/api/maintenance', maintenanceRoutes);

app.use('/api/victorias', victoriasRoutes);

app.use('/api/victorias-consecutivas', victoriasConsecutivasRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API is running' });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 3000;

// Solo iniciar el servidor si no estamos en Vercel
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`🚀 F1 API Server running on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  });
}

module.exports = app;
