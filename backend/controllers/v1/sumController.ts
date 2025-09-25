import { Request, Response } from 'express';

export const calculateSum = (req: Request, res: Response) => {
  const { numbers } = req.body; // Expecting an array of numbers

  if (!Array.isArray(numbers) || !numbers.every(num => typeof num === 'number')) {
    return res.status(400).json({ error: 'Invalid input: numbers must be an array of numbers.' });
  }

  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  res.json({ sum });
};
