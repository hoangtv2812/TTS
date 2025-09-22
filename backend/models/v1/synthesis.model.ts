

// In a real app, these would be more robustly typed and managed.
interface SynthesisRequest {
  text: string;
}

interface CallbackData {
  file: string;
  error: number;
  message: string;
  request_id: string;
}

export class SynthesisModel {
  /**
   * Calls the external TTS API to request a synthesis job.
   */
  public static async requestSynthesis(data: SynthesisRequest) {
    const apiKey = process.env.TTS_API_KEY;
    const apiDomain = process.env.API_DOMAIN;
    const ttsApiUrl = process.env.TTS_API_URL;

    if (!apiKey || !apiDomain || !ttsApiUrl) {
      throw new Error('TTS_API_KEY, API_DOMAIN and TTS_API_URL environment variables must be set.');
    }

    const callbackUrl = `${apiDomain}/api/v1/synthesis/callback`;

    try {
      const response = await fetch(ttsApiUrl, {
        method: 'POST',
        headers: {
          'api_key': apiKey,
          'callback_url': callbackUrl,
          'Content-Type': 'text/plain',
        },
        body: data.text,
      });

      if (!response.ok) {
        // Log the error and forward a generic error to the client
        console.error(`External API Error: ${response.status} ${response.statusText}`,
          await response.text());
        throw new Error('Failed to request synthesis from external service.');
      }

      const responseJson = await response.json();
      return responseJson; // Forward the initial response from the external API

    } catch (error) {
      console.error('Error calling external TTS API:', error);
      throw error; // Re-throw to be caught by the controller
    }
  }

  /**
   * Processes the callback received from the external TTS API.
   */
  public static async processCallback(callbackData: CallbackData) {
    // For now, we just log the result.
    // In a real app, you would look up the request_id in your database
    // and associate the audio file URL with the original job.
    console.log('[CALLBACK RECEIVED]', callbackData);

    if (callbackData.error === 0) {
      console.log(`Synthesis successful for request ${callbackData.request_id}. File is at: ${callbackData.file}`);
    } else {
      console.error(`Synthesis failed for request ${callbackData.request_id}. Reason: ${callbackData.message}`);
    }

    // No return value needed as this is the end of the line for this flow.
  }
}
