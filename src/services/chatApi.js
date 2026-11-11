
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

export async function sendChatMessageStream(
  sessionId,
  message,
  onChunk
) {
  const response = await fetch(`${API_BASE_URL}/chat/stream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      session_id: sessionId,
      message: message,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Streaming request failed.");
  }

  if (!response.body) {
    throw new Error("Response stream is not available.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    const events = buffer.split("\n\n");

    // Keep the incomplete event for the next read
    buffer = events.pop() || "";

    for (const event of events) {
      const dataLine = event
        .split("\n")
        .find((line) => line.startsWith("data: "));

      if (!dataLine) continue;

      const data = dataLine.slice(6);

      if (data === "[DONE]") {
        return;
      }

      const parsedData = JSON.parse(data);

      if (parsedData.error) {
        throw new Error(parsedData.error);
      }

      if (parsedData.content) {
        onChunk(parsedData.content);
      }
    }
  }

  // Process any remaining data
  if (buffer.trim()) {
    const dataLine = buffer
      .split("\n")
      .find((line) => line.startsWith("data: "));

    if (dataLine) {
      const data = dataLine.slice(6);

      if (data !== "[DONE]") {
        const parsedData = JSON.parse(data);

        if (parsedData.error) {
          throw new Error(parsedData.error);
        }

        if (parsedData.content) {
          onChunk(parsedData.content);
        }
      }
    }
  }
}
