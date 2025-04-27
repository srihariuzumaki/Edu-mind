import requests
import json

def test_ml_service():
    """Test the ML service with sample messages"""
    
    # Test URL
    url = "http://localhost:8000/analyze"
    
    # Test cases with diverse sentiments
    test_cases = [
        {
            "content": "I'm really excited and happy to learn about machine learning! This is amazing!",
            "chat_history": [
                {"role": "user", "content": "Hello"},
                {"role": "model", "content": "Hi! How can I help you today?"}
            ]
        },
        {
            "content": "This is terrible, I'm completely lost and frustrated with these concepts.",
            "chat_history": [
                {"role": "user", "content": "Can you explain neural networks?"},
                {"role": "model", "content": "Neural networks are..."}
            ]
        },
        {
            "content": "The sky is blue and today is Thursday.",
            "chat_history": []
        },
        {
            "content": "I love how well you explain things! You make learning so enjoyable!",
            "chat_history": []
        },
        {
            "content": "I'm really struggling and feel overwhelmed. Nothing makes sense.",
            "chat_history": []
        }
    ]
    
    print("Testing ML Service...")
    print("-" * 50)
    
    for i, test_case in enumerate(test_cases, 1):
        try:
            print(f"\nTest Case {i}:")
            print(f"Input: {test_case['content']}")
            
            response = requests.post(url, json=test_case)
            if response.status_code != 200:
                print(f"Error: HTTP {response.status_code}")
                print(f"Response: {response.text}")
                continue
                
            result = response.json()
            
            print("\nResults:")
            # Access sentiment data from the response
            sentiment = result.get('sentiment', 'N/A')
            print(f"Sentiment: {sentiment}")
            
            # Print intent and context score
            intent = result.get('intent', 'N/A')
            context_score = result.get('context_score', 0.0)
            print(f"Intent: {intent}")
            print(f"Context Score: {context_score}")
            
            # Print enhanced response if available
            enhanced_response = result.get('enhanced_response', '')
            if enhanced_response:
                print(f"Enhanced Response: {enhanced_response}")
            
            print("-" * 50)
            
        except requests.exceptions.ConnectionError:
            print(f"Error: Could not connect to the ML service at {url}")
            print("Make sure the service is running (python -m uvicorn ml_service:app --reload)")
            break
        except Exception as e:
            print(f"Error in test case {i}: {str(e)}")
            
if __name__ == "__main__":
    test_ml_service() 