
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function sendChatMessage(sessionId, message) {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      session_id: sessionId,
      message: message,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to get a response from the chatbot."
    );
  }

  return data;
}
