import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const taskController = new TaskController();

// Todas as rotas de tarefas requerem autenticação
router.use(authMiddleware);

router.post('/', (req, res) => taskController.create(req, res));
router.get('/', (req, res) => taskController.getAll(req, res));
router.get('/:id', (req, res) => taskController.getById(req, res));
router.put('/:id', (req, res) => taskController.update(req, res));
router.delete('/:id', (req, res) => taskController.delete(req, res));

export default router;

