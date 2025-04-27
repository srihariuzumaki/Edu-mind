import sys
import logging
from transformers import pipeline
from textblob import TextBlob

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def verify_installation():
    """Verify that all required components are installed"""
    try:
        # Test sentiment analyzer
        logger.info("Testing sentiment analyzer...")
        sentiment_analyzer = pipeline("sentiment-analysis")
        test_result = sentiment_analyzer("This is a test sentence.")
        logger.info(f"Sentiment analysis test successful: {test_result}")
        
        # Test TextBlob
        logger.info("Testing TextBlob...")
        blob = TextBlob("This is a test sentence.")
        logger.info(f"TextBlob test successful: {blob.sentiment}")
        
        # Test intent classifier
        logger.info("Testing intent classifier...")
        intent_classifier = pipeline("zero-shot-classification")
        test_result = intent_classifier(
            "This is a test sentence.",
            candidate_labels=["statement", "question"]
        )
        logger.info(f"Intent classification test successful: {test_result}")
        
        logger.info("All components verified successfully")
        return True
    except Exception as e:
        logger.error(f"Verification failed: {e}")
        return False

if __name__ == "__main__":
    logger.info("Starting setup process...")
    
    # Verify installation
    if not verify_installation():
        logger.error("Installation verification failed")
        sys.exit(1)
    
    logger.info("Setup completed successfully") 