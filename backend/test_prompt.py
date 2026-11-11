from app.knowledge_loader import load_knowledge_base
from app.prompt_builder import build_system_prompt

knowledge=load_knowledge_base()
system_prompt=build_system_prompt(knowledge)

print(system_prompt)

# Basic validation
assert "Soumyajit Bera" in system_prompt
assert "<KNOWLEDGE_BASE>" in system_prompt

print("\nSystem prompt generated successfully!")