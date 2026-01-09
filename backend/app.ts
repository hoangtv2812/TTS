import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors'; // Import cors

import v1Router from './routes/v1';

const app = express();

app.use(cors(
  {
    credentials: true,
    origin: [
      'http://localhost:5173', // Vite dev server
      'http://127.0.0.1:5173',
    ],
  }
)); // Use cors middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', v1Router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from TTS Backend!');
});

// Simple error handler for 404
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Sorry can't find that!");
});

// Error handler that crashes the app
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Fatal error:', err);
  process.exit(1); // Crash the app
});

export default app;
