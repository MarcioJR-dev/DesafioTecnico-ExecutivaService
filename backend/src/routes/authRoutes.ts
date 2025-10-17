import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

const router = Router();
const authController = new AuthController();

router.post('/signup', (req, res) => authController.signup(req, res));
router.post('/signin', (req, res) => authController.signin(req, res));

export default router;

