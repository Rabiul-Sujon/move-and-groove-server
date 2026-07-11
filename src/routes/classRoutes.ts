
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Get all classes' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'Get class by id' });
});

export default router;
