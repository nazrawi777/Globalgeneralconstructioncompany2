"""
Utility functions for the main application.
"""
import google.generativeai as genai
from .models import ChatBotConfig


def get_gemini_response(user_message):
    """
    Get response from Google Gemini API for chatbot.
    
    Args:
        user_message (str): The user's message to the chatbot
        
    Returns:
        str: The chatbot's response
        
    Raises:
        ValueError: If no active chatbot configuration exists or API key is missing
        Exception: If API call fails
    """
    # Get active chatbot configuration
    try:
        config = ChatBotConfig.objects.filter(is_active=True).first()
        if not config:
            raise ValueError("No active chatbot configuration found")
        
        if not config.api_key:
            raise ValueError("API key is not configured")
        
        # Configure Gemini API
        genai.configure(api_key=config.api_key)
        
        # Create model
        model = genai.GenerativeModel('gemini-pro')
        
        # Prepare prompt with context
        prompt = f"{config.context}\n\nUser: {user_message}\nAssistant:"
        
        # Generate response
        response = model.generate_content(prompt)
        
        return response.text
        
    except ValueError as e:
        raise e
    except Exception as e:
        raise Exception(f"Error communicating with Gemini API: {str(e)}")
