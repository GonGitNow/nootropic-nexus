import { Router } from 'express';
import { getAllNootropics, getNootropic, createNootropic } from '../controllers/nootropicController';

const router = Router();

router.get('/nootropics', getAllNootropics);
router.get('/nootropics/:name', getNootropic);
router.post('/nootropics', createNootropic);

export default router; 