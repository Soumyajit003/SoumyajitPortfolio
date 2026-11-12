
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

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function waitForBackend(onStatus) {
  const maxWaitTime = 120000; // 2 minutes
  const retryInterval = 3000; // 3 seconds
  const requestTimeout = 8000; // 8 seconds

  const startTime = Date.now();

  onStatus?.("connecting");

  while (Date.now() - startTime < maxWaitTime) {
    try {
      const controller = new AbortController();

      const timeoutId = setTimeout(
        () => controller.abort(),
        requestTimeout
      );

      try {
        const response = await fetch(`${API_BASE_URL}/health`, {
          method: "GET",
          cache: "no-store",
          signal: controller.signal,
        });

        const contentType = response.headers.get("content-type") || "";

        if (response.ok && contentType.includes("application/json")) {
          const data = await response.json();

          if (data.status === "ok") {
            return true;
          }
        }
      } finally {
        clearTimeout(timeoutId);
      }
    } catch (error) {
      // Backend is still starting or temporarily unreachable.
      console.log("Waiting for backend to become available...");
    }

    await sleep(retryInterval);
  }

  throw new Error(
    "The server is taking longer than expected to start. Please try again."
  );
}

export async function sendChatMessageStream(
  sessionId,
  message,
  onChunk,
  onStatus
) {
  // Wait until Render backend is ready
  await waitForBackend(onStatus);

  // Backend is ready; now request AI generation
  onStatus?.("thinking");

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
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("text/event-stream")) {
    throw new Error("The backend did not return a valid stream.");
  }

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
