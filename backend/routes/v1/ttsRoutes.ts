import express from 'express';
import { synthesizeText } from '../../controllers/v1/ttsController';

const router = express.Router();

router.post('/synthesize', synthesizeText);

export default router;