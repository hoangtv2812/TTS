import { Request, Response } from 'express';
import { SynthesisModel } from '../../models/v1/synthesis.model';

export class SynthesisController {
  /**
   * Receives a request from our client to start a TTS job.
   */
  public static async create(req: Request, res: Response) {
    try {
      const text = req.body.text;
      if (!text) {
        return res.status(400).json({ message: 'Missing \'text\' in request body.' });
      }

      // Call the model to contact the external API
      const externalApiResponse = await SynthesisModel.requestSynthesis({ text });

      // Forward the response from the external API to our client
      res.status(200).json(externalApiResponse);

    } catch (error) {
      // If the model throws an error (e.g., external API is down)
      res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
  }

  /**
   * Receives the callback from the external TTS service.
   */
  public static async handleCallback(req: Request, res: Response) {
    try {
      const callbackData = req.body;

      // Asynchronously process the callback data (no need to wait)
      SynthesisModel.processCallback(callbackData);

      // Immediately respond to the callback provider with a 200 OK
      // to acknowledge receipt.
      res.status(200).send('Callback received.');

    } catch (error) {
      // This would only catch errors in the initial parsing of the request.
      // The actual logic in the model is fire-and-forget.
      console.error('Error in callback handler:', error);
      res.status(500).send('Error processing callback.');
    }
  }
}
