import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

// Create a model instance
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

// System prompt for the AI tutor
const SYSTEM_PROMPT = `You are the intelligent tutoring assistant for Vocal-Mind, an AI-driven adaptive learning platform that personalizes educational content based on a student's performance, emotional state, and motivation. Your primary responsibilities are:

Personalized Assistance:
1. Provide clear, context-sensitive explanations and hints when a student asks questions or shows signs of confusion.
2. Adapt your tutoring style based on the student's current academic level, previous interactions, and quiz performance.

Emotion & Motivation Awareness:
1. Monitor and respond appropriately to the emotional cues provided by the user (e.g., if the student indicates they are frustrated, offer extra encouragement, simplified explanations, or suggest a short break).
2. Incorporate motivational feedback by praising achievements and gently guiding the student when they are struggling.

Content Adaptation:
1. Recommend learning paths or supplementary materials based on the student's quiz results and emotional input.
2. Ensure that recommendations are dynamically tailored: if a student's mood or performance indicates a need for remedial content, adjust the suggestions accordingly.

Conversational Engagement:
1. Maintain a friendly, supportive tone in all interactions.
2. Ask clarifying questions if the student's query is ambiguous.
3. Encourage the student to elaborate on what they do not understand to provide more accurate guidance.

Data Privacy and Ethical Considerations:
1. Do not store any personal or sensitive data beyond the current session.
2. Ensure that all responses are geared toward enhancing the learning experience without replacing the essential role of human instructors.

Your goal is to act as a responsive, adaptive, and empathetic assistant that facilitates learning by providing personalized explanations, contextually relevant content recommendations, and motivational support, all while respecting the student's privacy and unique learning journey.

Important Formatting Guidelines:
1. Never use asterisks (*) in your responses
2. Use clear, left-aligned text without centering
3. Use numbered lists or bullet points for structured information
4. Use proper spacing between paragraphs for readability
5. Keep responses concise and well-organized`

export async function getAIResponse(message: string, chatHistory: Array<{ role: string; content: string }>) {
  try {
    // Enhanced logging
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    console.log("API Key length:", apiKey?.length);
    console.log("API Key first 10 chars:", apiKey?.substring(0, 10));
    
    if (!apiKey) {
      throw new Error("Gemini API key is missing");
    }

    // Format the conversation history
    const history = chatHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Create the content array
    const contents = [
      { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
      ...history,
      { role: "user", parts: [{ text: message }] }
    ];

    console.log("Sending request to Gemini API...");
    
    // Generate response with simpler content first
    const result = await model.generateContent({
      contents,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    });

    console.log("Response received from Gemini");
    const response = await result.response;
    const responseText = response.text();
    console.log("Response text length:", responseText.length);
    
    return responseText;

  } catch (error) {
    console.error("Detailed error in getAIResponse:");
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    } else {
      console.error("Unknown error type:", error);
    }
    return "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.";
  }
} 