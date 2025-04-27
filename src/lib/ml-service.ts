interface Message {
  content: string;
  role: 'user' | 'model';
}

interface MLResponse {
  enhanced_response: string;
  sentiment: string;
  intent: string;
  context_score: number;
  score?: number;
  subjectivity?: number;
}

const ML_SERVICE_URL = 'http://localhost:8000';

export async function analyzeMessage(content: string, chatHistory: Message[]): Promise<MLResponse> {
  try {
    console.log('Sending request to ML service:', {
      content,
      chat_history: chatHistory
    });

    const response = await fetch(`${ML_SERVICE_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        content,
        chat_history: chatHistory.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ML service error:', errorText);
      throw new Error(`ML service request failed: ${errorText}`);
    }

    const data = await response.json();
    console.log('ML service response:', data);

    return {
      enhanced_response: data.enhanced_response || content,
      sentiment: data.sentiment || 'NEUTRAL',
      intent: data.intent || 'statement',
      context_score: data.context_score || 1.0,
      score: data.score,
      subjectivity: data.subjectivity
    };
  } catch (error) {
    console.error('Error analyzing message:', error);
    // Return default values if ML service fails
    return {
      enhanced_response: content,
      sentiment: 'NEUTRAL',
      intent: 'statement',
      context_score: 1.0
    };
  }
} 