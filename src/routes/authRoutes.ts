import { Router, Router as ExpressRouter } from 'express';
import { register, login, demoLogin, getMe } from '../controllers/authController';
import { protect } from '../middleware/auth';

const router: ExpressRouter = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/demo', demoLogin);
router.get('/me', protect, getMe);

export default router;