import json
from fastapi.responses import StreamingResponse
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.chatbot import generate_response, generate_response_stream
from app.knowledge_loader import load_knowledge_base
from app.prompt_builder import build_system_prompt
from app.conversation import ConversationManager



# creating FastAPI application
app=FastAPI(title="Portfolio AI Chatbot Jix")


# configuring cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://soumyajitbera.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# loading knowledge base and building the system prompt
knowledge_base=load_knowledge_base()
system_prompt=build_system_prompt(knowledge_base)


# creating conversation manager
conversation_manager=ConversationManager()


# defining the request structure
class ChatRequest(BaseModel):
    session_id: str
    message: str

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "message": "Backend is ready"
    }

# home endpoint
@app.get("/")
def home():
    return { "message": "Portfolio Chatbot API is running!" }

# chat endpoint
@app.post("/chat")
def chat(request: ChatRequest):
    try:
        session_id=request.session_id
        user_message=request.message.strip()

        if not session_id or not user_message:
            raise HTTPException(
                status_code=400,
                detail="Session ID and message are required."
            )

        # create conversation if it doesn't exist
        if not conversation_manager.get_history(session_id):
            conversation_manager.create_conversation(session_id, system_prompt)

        # add user message
        conversation_manager.add_conversation(session_id, "user", user_message)

        # retrieve conversation history
        messages=conversation_manager.get_history(session_id)

        # generate AI response
        answer=generate_response(messages)

        # save ai answer
        conversation_manager.add_conversation(session_id, "assistant", answer)

        return {
            "session_id": session_id,
            "reply": answer
        }
    
    except Exception as error:
        print(f"Chat endpoint error: {error}")
        raise HTTPException(
            status_code=500,
            detail="Something went wrong while generating the response."
        )

# /chat/stream endpoint for streamming
@app.post("/chat/stream")
def chat_stream(request: ChatRequest):
    try:
        session_id=request.session_id
        user_message=request.message.strip()

        if not session_id or not user_message:
            raise HTTPException(
                status_code=400,
                detail="Session ID and message are required."
            )

        # create conversation if it doesn't exist
        if not conversation_manager.get_history(session_id):
            conversation_manager.create_conversation(session_id, system_prompt)

        # add user message
        conversation_manager.add_conversation(session_id, "user", user_message)

        # retrieve conversation history
        messages=conversation_manager.get_history(session_id)

        def stream_response():
            full_response=""
            try:
                # Generate and send chunks
                for chunk in generate_response_stream(messages):
                    full_response+=chunk
                    yield f"data: {json.dumps({'content': chunk})}\n\n"

                # Save complete assistant response
                conversation_manager.add_conversation(session_id, "assistant", full_response)
                yield "data: [DONE]\n\n"
            except Exception as error:
                print(f"Streaming endpoint error: {error}")

                yield f"data: {json.dumps({'error': 'Unable to generate response.'})}\n\n"

        return StreamingResponse(
            stream_response(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "X-Accel-Buffering": "no"
            }
        )
    except Exception as error:
            print(f"Chat endpoint error: {error}")
            raise HTTPException(
                status_code=500,
                detail="Something went wrong while generating the response."
            )
        
