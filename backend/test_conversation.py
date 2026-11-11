from app.conversation import ConversationManager

manager=ConversationManager()

manager.create_conversation(
    "session_101",
    "You are a portfolio assistant Jix"
)

manager.add_conversation(
    "session_101",
    "user",
    "What are the project of soumyajit?"
)

manager.add_conversation(
    "session_101",
    "assistant",
    "I've built Lurnix, Eatnow, PlayTube, and FlowDesk."
)

history=manager.get_history("session_101")
for message in history:
    print(f"{message['role']}: {message['content']}")