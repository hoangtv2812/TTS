import express, { Request, Response, NextFunction } from 'express';

import v1Router from './routes/v1';

const app = express();

<<<<<<< Updated upstream
app.use('/api/v1', v1Router);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

=======
// Body parsers must be registered before any routers that need them.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', v1Router);

>>>>>>> Stashed changes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from TTS Backend!');
});

// Simple error handler for 404
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Sorry can't find that!");
});

export default app;