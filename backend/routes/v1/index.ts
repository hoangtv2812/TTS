import { Router } from 'express';
import synthesisRouter from './synthesis.route';
import sumRoutes from './sumRoutes';
import ttsRoutes from './ttsRoutes';

const router = Router();

// All v1 routes will be registered here
router.use(synthesisRouter);
router.use(sumRoutes); // Add sumRoutes
router.use(ttsRoutes);

export default router;
