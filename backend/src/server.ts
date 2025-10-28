import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Import space routers
import rootRoutes from './spaces/root/routes.js';
import islamRoutes from './spaces/islam/routes.js';
import discordRoutes from './spaces/discord/routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'SSyncSpace Backend is running! 🚀'
  });
});

// Space routes
app.use('/api/root', rootRoutes);
app.use('/api/islam', islamRoutes);
app.use('/api/discord', discordRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 SSyncSpace Backend running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
});