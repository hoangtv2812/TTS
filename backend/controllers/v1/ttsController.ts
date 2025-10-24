import { Request, Response } from 'express';

export const synthesizeText = async (req: Request, res: Response) => {
  const { text, voice } = req.body;

  console.log('Received synthesis request:', { text, voice });

  // In the future, you can add the service call here.

  res.status(200).json({ message: 'Request received successfully', text, voice });
};