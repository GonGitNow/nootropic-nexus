import { Router } from 'express';
import {
  getAllStacks,
  getStack,
  createStack,
  updateStack,
  rateStack
} from '../controllers/stackController';

const router = Router();

router.get('/stacks', getAllStacks);
router.get('/stacks/:id', getStack);
router.post('/stacks', createStack);
router.put('/stacks/:id', updateStack);
router.post('/stacks/:id/rate', rateStack);

export default router; 