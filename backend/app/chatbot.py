from groq import Groq
from app.config import (GROQ_API_KEY, MODEL_NAME, validate_config)

# Validate configuration before initializing Groq
validate_config()

# Initializing the groq client
client=Groq(api_key=GROQ_API_KEY)

def generate_response(messages: list) -> str:
    """
    Send messages to Groq and return the generated response.
    """

    try:
        response=client.chat.completions.create(
            model=MODEL_NAME,
            messages=messages,
            temperature=0.7,
            max_completion_tokens=1024
        )
        answer=response.choices[0].message.content
        return answer
    
    except Exception as error:
        print(f"Groq API Error: {error}")
        raise

    
def generate_response_stream(messages: list):
    """
    Generate an AI response as a stream of text chunks.
    """
    try:
        stream = client.chat.completions.create(
            model=MODEL_NAME,
            messages=messages,
            temperature=0.7,
            max_completion_tokens=1024,
            stream=True
        )

        for chunk in stream:
            content = chunk.choices[0].delta.content

            if content:
                yield content

    except Exception as error:
        print(f"Groq Streaming Error: {error}")
        raise
