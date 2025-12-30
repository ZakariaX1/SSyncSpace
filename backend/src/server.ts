import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

// Import space routers
import rootRoutes from './spaces/root/routes.js';
import islamRoutes from './spaces/islam/routes.js';
import discordRoutes from './spaces/discord/routes.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      process.env.FRONTEND_URL || 'http://localhost:5173',
      /^https?:\/\/[\w-]+\.localhost:5173$/,  // Any subdomain on localhost:5173
      // Add production domains when deployed
      // /^https?:\/\/[\w-]+\.yourdomain\.com$/
    ];
    
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    
    // Check if origin matches any allowed pattern
    const isAllowed = allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') return allowed === origin;
      return allowed.test(origin);
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

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