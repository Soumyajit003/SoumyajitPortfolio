from app.knowledge_loader import load_knowledge_base
from app.prompt_builder import build_system_prompt
from app.chatbot import generate_response

knowledge=load_knowledge_base()
sys_pr=build_system_prompt(knowledge)

messages=[
    {
        "role": "system",
        "content": sys_pr
    },
    {
        "role": "user",
        "content": "does he has any type of experiences?"
    }
]

ans=generate_response(messages)
print(ans)
