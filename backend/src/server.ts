import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { logger } from './middlewares/logger';
import { corsConfig } from './config/cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors(corsConfig));
app.use(express.json());
app.use(logger);

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Rota de health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Servidor rodando' });
});

// Middleware de erro (deve ser o último)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

