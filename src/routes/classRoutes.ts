import { Router, Router as ExpressRouter } from 'express';
import {
  getClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
  getStyles,
} from '../controllers/classController';
import { protect } from '../middleware/auth';

const router: ExpressRouter = Router();

router.get('/', getClasses);
router.get('/styles', getStyles);
router.get('/:id', getClassById);
router.post('/', protect, createClass);
router.put('/:id', protect, updateClass);
router.delete('/:id', protect, deleteClass);

export default router;