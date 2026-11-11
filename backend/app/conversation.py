class ConversationManager:
    def __init__(self):
        self.conversations = {}

    def create_conversation(self, session_id: str, system_prompt: str):
        self.conversations[session_id] = [
            {
                "role": "system",
                "content": system_prompt
            }
        ]

    def add_conversation(self, session_id: str, role: str, content: str):
        self.conversations[session_id].append(
            {
                "role": role,
                "content": content
            }
        )

    def get_history(self, session_id: str):
        return self.conversations.get(session_id, [])
    
    def clear_conversation(self, session_id: str):
        self.conversations.pop(session_id, None)
    