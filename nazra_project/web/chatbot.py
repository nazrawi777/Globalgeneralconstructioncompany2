import os
import requests
from .models import ChatBotConfig


def get_gemini_response(user_message):
    api_key = os.environ.get("GEMINI_API_KEY")

    if not api_key:
        return "I'm sorry, but I'm currently unable to process requests. Please contact the administrator."

    # Fetch active configuration
    config = ChatBotConfig.objects.filter(is_active=True).first()
    company_context = config.context if config else "You are a helpful assistant."

    prompt = f"{company_context}\n\nUser Query: {user_message}"

    url = (
        "https://generativelanguage.googleapis.com/v1beta/"
        "models/gemini-3-flash-preview:generateContent"
    )

    headers = {
        "Content-Type": "application/json",
    }

    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ]
    }

    try:
        response = requests.post(
            f"{url}?key={api_key}",
            headers=headers,
            json=payload,
            timeout=30,
        )
        response.raise_for_status()

        data = response.json()

        return (
            data["candidates"][0]["content"]["parts"][0]["text"]
            if data.get("candidates")
            else "No response generated."
        )

    except requests.exceptions.RequestException as e:
        print("Gemini API request error:", e)
        return "I apologize, but I encountered an error while processing your request."

    except (KeyError, IndexError) as e:
        print("Gemini response parsing error:", e)
        return "I received an unexpected response format from the AI."
