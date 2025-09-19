import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get('/api/status', (req: Request, res: Response) => {
  res.json({ status: 'Backend is running' });
});

app.listen(port, () => {
  console.log(`Backend server is listening on http://localhost:${port}`);
});
