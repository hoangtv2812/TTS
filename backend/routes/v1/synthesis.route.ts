import { Router } from 'express';
import { SynthesisController } from '../../controllers/v1/synthesis.controller';

const router = Router();

// Route to initiate the TTS job
router.post('/synthesis', SynthesisController.create);

// Route for the external service to call back to
router.post('/synthesis/callback', SynthesisController.handleCallback);

export default router;
