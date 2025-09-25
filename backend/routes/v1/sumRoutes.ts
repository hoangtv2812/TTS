import { Router } from 'express';
import { calculateSum } from '../../controllers/v1/sumController';

const router = Router();

router.post('/sum', calculateSum);

export default router;
