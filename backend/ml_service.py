from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Dict
from transformers import pipeline
from textblob import TextBlob
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize ML models
try:
    sentiment_analyzer = pipeline("sentiment-analysis")
    intent_classifier = pipeline("zero-shot-classification")
    logger.info("ML models initialized successfully")
except Exception as e:
    logger.error(f"Error initializing ML models: {e}")
    raise

class Message(BaseModel):
    content: str
    chat_history: List[Dict[str, str]]

class MLResponse(BaseModel):
    enhanced_response: str
    sentiment: str
    intent: str
    context_score: float
    score: float | None = None
    subjectivity: float | None = None

def simple_tokenize(text: str) -> set:
    """Simple tokenization function"""
    # Convert to lowercase and split on whitespace
    words = text.lower().split()
    # Remove basic punctuation
    words = [word.strip('.,!?()[]{}:;"\'') for word in words]
    # Remove empty strings
    return set(word for word in words if word)

def analyze_sentiment(text: str) -> dict:
    """Analyze sentiment using both transformers and TextBlob"""
    # Hugging Face sentiment analysis
    hf_sentiment = sentiment_analyzer(text)[0]
    
    # TextBlob sentiment analysis
    blob = TextBlob(text)
    textblob_polarity = blob.sentiment.polarity
    textblob_subjectivity = blob.sentiment.subjectivity
    
    # Define emotion keywords
    positive_words = {'happy', 'great', 'excellent', 'amazing', 'wonderful', 'good', 'love', 'enjoy', 'excited', 'fantastic'}
    negative_words = {'sad', 'bad', 'terrible', 'awful', 'horrible', 'hate', 'frustrated', 'angry', 'disappointed', 'confused'}
    
    # Check for emotion keywords
    words = simple_tokenize(text)
    has_positive = any(word in positive_words for word in words)
    has_negative = any(word in negative_words for word in words)
    
    # Determine sentiment
    if has_positive or textblob_polarity > 0.05:
        sentiment = "POSITIVE"
        score = max(hf_sentiment["score"], 0.6)
    elif has_negative or textblob_polarity < -0.05:
        sentiment = "NEGATIVE"
        score = max(hf_sentiment["score"], 0.6)
    else:
        sentiment = "NEUTRAL"
        score = hf_sentiment["score"]
    
    return {
        "label": sentiment,
        "score": score,
        "subjectivity": textblob_subjectivity
    }

def detect_intent(text: str) -> str:
    """Detect the intent of the message"""
    candidate_labels = [
        "question",
        "statement",
        "request_for_help",
        "greeting",
        "farewell",
        "clarification",
        "agreement",
        "disagreement"
    ]
    
    result = intent_classifier(text, candidate_labels)
    return result["labels"][0]

def analyze_context(current_message: str, chat_history: List[Dict[str, str]]) -> float:
    """Analyze contextual relevance of the current message"""
    if not chat_history:
        return 1.0
    
    try:
        # Get the last few messages for context
        recent_messages = chat_history[-3:]
        context_text = " ".join([msg["content"] for msg in recent_messages])
        
        # Tokenize messages
        current_tokens = simple_tokenize(current_message)
        context_tokens = simple_tokenize(context_text)
        
        # Calculate similarity
        intersection = len(current_tokens.intersection(context_tokens))
        union = len(current_tokens.union(context_tokens))
        
        if union == 0:
            return 0.0
        
        similarity = intersection / union
        logger.info(f"Context similarity score: {similarity}")
        return similarity
        
    except Exception as e:
        logger.error(f"Error in context analysis: {e}")
        return 1.0

@app.post("/analyze", response_model=MLResponse)
async def analyze_message(message: Message):
    try:
        logger.info(f"Received message: {message.content[:100]}...")
        
        # Analyze sentiment
        sentiment_result = analyze_sentiment(message.content)
        logger.info(f"Sentiment analysis result: {sentiment_result}")
        
        # Detect intent
        intent = detect_intent(message.content)
        logger.info(f"Intent detection result: {intent}")
        
        # Analyze context
        context_score = analyze_context(message.content, message.chat_history)
        logger.info(f"Context analysis score: {context_score}")
        
        response = MLResponse(
            enhanced_response=message.content,
            sentiment=sentiment_result["label"],
            intent=intent,
            context_score=context_score,
            score=sentiment_result.get("score"),
            subjectivity=sentiment_result.get("subjectivity")
        )
        
        logger.info("Successfully processed message")
        return response
    
    except Exception as e:
        logger.error(f"Error processing message: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 