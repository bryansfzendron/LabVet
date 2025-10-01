import { Router } from 'express';
import authRoutes from './auth'; // Nova rota de autenticação
import clienteRoutes from './cliente.routes';
import animalRoutes from './animal.routes';
import profissionalRoutes from './profissional.routes';
import exameRoutes from './exame.routes';
import pedidoRoutes from './pedido.routes';
import laudoRoutes from './laudo.routes';
import relatorioRoutes from './relatorio.routes';
import financeiroRoutes from './financeiro.routes';

const router = Router();

// Rota de saúde da API
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    message: 'LabVet API funcionando com autenticação JWT'
  });
});

// Registrar todas as rotas
router.use('/auth', authRoutes); // Autenticação JWT real
router.use('/clientes', clienteRoutes);
router.use('/animais', animalRoutes);
router.use('/profissionais', profissionalRoutes);
router.use('/exames', exameRoutes);
router.use('/pedidos', pedidoRoutes);
router.use('/laudos', laudoRoutes);
router.use('/relatorios', relatorioRoutes);
router.use('/financeiro', financeiroRoutes);

export default router;
