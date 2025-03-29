import axios from 'axios';

const SARVAM_API_KEY = import.meta.env.VITE_SARVAM_API_KEY;
const SARVAM_API_URL = 'https://api.sarvam.ai';

// Add API key validation
if (!SARVAM_API_KEY) {
  console.error('Sarvam API key is missing. Please add VITE_SARVAM_API_KEY to your .env file');
}

export interface TextToSpeechOptions {
  targetLanguageCode: string;
  speaker?: string;
  pitch?: number;
  pace?: number;
  loudness?: number;
}

export async function textToSpeech(text: string, options: TextToSpeechOptions): Promise<string> {
  try {
    if (!SARVAM_API_KEY) {
      throw new Error('Sarvam API key is missing');
    }

    console.log("Starting text-to-speech process...");
    console.log("Text length:", text.length);
    console.log("Target language:", options.targetLanguageCode);
    console.log("Speaker:", options.speaker);

    const response = await axios.post<{ audios: string[] }>(
      `${SARVAM_API_URL}/text-to-speech`,
      {
        inputs: [text],
        target_language_code: options.targetLanguageCode,
        speaker: options.speaker || 'meera',
        pitch: options.pitch || 0,
        pace: options.pace || 1.0,
        loudness: options.loudness || 1.0,
        model: 'bulbul:v1',
        speech_sample_rate: 22050
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'API-Subscription-Key': SARVAM_API_KEY
        }
      }
    );

    if (!response.data.audios?.[0]) {
      throw new Error('No audio data received from the server');
    }

    console.log("Received audio data length:", response.data.audios[0].length);
    return response.data.audios[0];
  } catch (error) {
    console.error('Error in text-to-speech process:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
      if (error.response?.status === 403) {
        throw new Error('Invalid or missing Sarvam API key. Please check your .env file.');
      }
    }
    throw new Error('Failed to convert text to speech');
  }
}

export const SUPPORTED_LANGUAGES = [
  { code: 'hi-IN', name: 'Hindi' },
  { code: 'bn-IN', name: 'Bengali' },
  { code: 'kn-IN', name: 'Kannada' },
  { code: 'ml-IN', name: 'Malayalam' },
  { code: 'mr-IN', name: 'Marathi' },
  { code: 'od-IN', name: 'Odia' },
  { code: 'pa-IN', name: 'Punjabi' },
  { code: 'ta-IN', name: 'Tamil' },
  { code: 'te-IN', name: 'Telugu' },
  { code: 'gu-IN', name: 'Gujarati' },
  { code: 'en-IN', name: 'English' }
];

export const SPEAKERS = [
  { id: 'meera', name: 'Meera' },
  { id: 'pavithra', name: 'Pavithra' },
  { id: 'maitreyi', name: 'Maitreyi' },
  { id: 'arvind', name: 'Arvind' },
  { id: 'amol', name: 'Amol' },
  { id: 'amartya', name: 'Amartya' }
]; 