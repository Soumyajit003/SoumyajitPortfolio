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
        "content": "tell me about soumyajit's one of the major project which does not have any ai feature."
    }
]

ans=generate_response(messages)
print(ans)
