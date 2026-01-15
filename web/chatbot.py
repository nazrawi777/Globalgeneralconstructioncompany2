import os
from google import genai
from .models import ChatBotConfig


def get_gemini_response(user_message):
    api_key = os.environ.get("GEMINI_API_KEY")
    print(f"DEBUG: API Key loaded: {'Yes' if api_key else 'No'}")
    print(f"DEBUG: API Key length: {len(api_key) if api_key else 0}")

    if not api_key:
        return "I'm sorry, but I'm currently unable to process requests. Please contact the administrator."

    # Fetch the active configuration
    config = ChatBotConfig.objects.filter(is_active=True).first()
    company_context = config.context if config else "You are a helpful assistant."
    print(f"DEBUG: Using context: {company_context[:50]}...")

    try:
        client = genai.Client(api_key=api_key)

        # Prepend context to the first message
        prompt = f"{company_context}\n\nUser Query: {user_message}"

        response = client.models.generate_content(
            model="gemini-3-flash-preview", contents=prompt
        )
        return response.text
    except Exception as e:
        print(f"Gemini API Error Type: {type(e).__name__}")
        print(f"Gemini API Error: {e}")
        import traceback

        traceback.print_exc()
        return "I apologize, but I encountered an error while processing your request. Please try again later."
