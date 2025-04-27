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

// Function to split text into sentences
function splitIntoSentences(text: string): string[] {
  // Split on period followed by space or newline, question mark, or exclamation mark
  const sentences = text.match(/[^.!?]+[.!?]+|\s*\n\s*|\s*\r\n\s*/g) || [];
  return sentences.map(s => s.trim()).filter(s => s.length > 0);
}

// Function to combine chunks optimally
function combineChunks(sentences: string[]): string[] {
  const chunks: string[] = [];
  let currentChunk = '';
  const MAX_CHUNK_LENGTH = 250; // Maximum characters per chunk

  for (const sentence of sentences) {
    if (currentChunk.length + sentence.length > MAX_CHUNK_LENGTH && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk += (currentChunk ? ' ' : '') + sentence;
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

// Function to convert base64 to Blob
function base64ToBlob(base64: string): Blob {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  
  const byteArray = new Uint8Array(byteNumbers);
  // Use audio/wav MIME type with proper codec
  return new Blob([byteArray], { type: 'audio/wav; codecs=1' });
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

    // Split text into optimal chunks
    const sentences = splitIntoSentences(text);
    const chunks = combineChunks(sentences);
    console.log("Split text into", chunks.length, "chunks");

    // Process each chunk
    const audioPromises = chunks.map(chunk => 
      axios.post<{ audios: string[] }>(
        `${SARVAM_API_URL}/text-to-speech`,
        {
          inputs: [chunk],
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
      )
    );

    // Wait for all chunks to be processed
    const responses = await Promise.all(audioPromises);
    
    // Convert each base64 audio to a Blob
    const audioBlobs = responses.map(response => {
      if (!response.data.audios?.[0]) {
        throw new Error('No audio data received from the server');
      }
      return base64ToBlob(response.data.audios[0]);
    });

    // Combine all blobs into a single blob
    const combinedBlob = new Blob(audioBlobs, { type: 'audio/wav; codecs=1' });
    
    // Create a URL for the combined blob
    const audioUrl = URL.createObjectURL(combinedBlob);
    console.log("Created audio URL:", audioUrl);
    
    return audioUrl;
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