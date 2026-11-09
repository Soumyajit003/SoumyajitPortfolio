from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
KNOWLEDGE_DIR = BASE_DIR/"knowledge"

def load_knowledge_base():
    """
    Load all personal information from Markdown files
    and combine them into a single string.
    """

    knowledge_files = [
        "personal_info.md",
        "education.md",
        "experience.md",
        "skills.md",
        "projects.md"
    ]

    knowledge_content = []

    for filename in knowledge_files:
        file_path = KNOWLEDGE_DIR/filename

        if not file_path.exists():
            raise FileNotFoundError(f"Knowledge file not found: {filename}")

        with open(file_path, "r", encoding="utf-8") as file:
            content=file.read()

        knowledge_content.append(
            f"\n\n# {filename.replace('.md', '').upper()}\n"
            f"{content}"
        )

    return "\n".join(knowledge_content)
