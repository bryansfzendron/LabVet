import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import * as dotenv from 'dotenv';

// Importar rotas
import authRoutes from './routes/auth';
import clienteRoutes from './routes/cliente.routes';
import animalRoutes from './routes/animal.routes';
import profissionalRoutes from './routes/profissional.routes';
import exameRoutes from './routes/exame.routes';
import pedidoRoutes from './routes/pedido.routes';
import laudoRoutes from './routes/laudo.routes';
import financeiroRoutes from './routes/financeiro.routes';
import relatorioRoutes from './routes/relatorio.routes';

// Importar middlewares
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { requestLogger } from './middleware/requestLogger';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ================================
// MIDDLEWARES DE SEGURANÇA
// ================================

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP
  message: {
    error: 'Muitas tentativas. Tente novamente em 15 minutos.',
  },
});

app.use(limiter);

// Segurança
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:5173',
    'http://localhost:5178',
    'https://labvet.bryanzendron.com.br',
    'http://labvet.bryanzendron.com.br'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Compressão
app.use(compression());

// Logging
app.use(morgan('combined'));

// ================================
// MIDDLEWARES DE PARSING
// ================================

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware customizado de logging
app.use(requestLogger);

// ================================
// ROTAS DA API
// ================================

// Health check
app.get('/health', (req: any, res: any) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/animais', animalRoutes);
app.use('/api/profissionais', profissionalRoutes);
app.use('/api/exames', exameRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/laudos', laudoRoutes);
app.use('/api/financeiro', financeiroRoutes);
app.use('/api/relatorios', relatorioRoutes);

// ================================
// MIDDLEWARES DE ERRO
// ================================

// 404 - Rota não encontrada
app.use(notFound);

// Error handler global
app.use(errorHandler);

// ================================
// INICIALIZAÇÃO DO SERVIDOR
// ================================

const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor LabVet rodando na porta ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`📚 API Base URL: http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM recebido. Encerrando servidor...');
  server.close(() => {
    console.log('✅ Servidor encerrado com sucesso.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT recebido. Encerrando servidor...');
  server.close(() => {
    console.log('✅ Servidor encerrado com sucesso.');
    process.exit(0);
  });
});

export default app;
