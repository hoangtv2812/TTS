import { Router } from 'express';
import synthesisRouter from './synthesis.route';

const router = Router();

// All v1 routes will be registered here
router.use(synthesisRouter);

export default router;
