import { getSessionId } from "../../utils/session";
import { sendChatMessageStream } from "../../services/chatApi";
import { useState, useRef, useEffect } from "react";
import { assets } from "../../assets/assets";
import { img } from "motion/react-client";

function Chatbot() {
  const [sessionId] = useState(() => getSessionId());
  
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm Jix, Soumyajit's AI portfolio assistant. Ask me anything about his skills, experience, or projects.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasReceivedChunk, setHasReceivedChunk] = useState(false);

  // UI-only state: floating widget open/closed
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const dialogRef = useRef(null);
  const messagesRef = useRef(null);

  // UI-only: keep the latest message in view
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading, isOpen]);

  // UI-only: scrolling inside the chat window must never scroll the page.
  // Wheel events over the message list scroll the list; anywhere else on the
  // window (header, input bar) they are swallowed instead of reaching the page.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;

    function handleWheel(e) {
      // Stop smooth-scroll libraries (Lenis etc.) listening on window
      e.stopPropagation();

      const scroller = messagesRef.current;

      // Outside the message list: nothing to scroll, so block the page
      if (!scroller || !scroller.contains(e.target)) {
        e.preventDefault();
        return;
      }

      // At the top/bottom edge of the list: block the page from taking over
      const atTop = scroller.scrollTop <= 0 && e.deltaY < 0;
      const atBottom =
        scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1 &&
        e.deltaY > 0;

      if (atTop || atBottom) e.preventDefault();
    }

    dialog.addEventListener("wheel", handleWheel, { passive: false });
    return () => dialog.removeEventListener("wheel", handleWheel);
  }, [isOpen]);


  async function handleSendMessage(e) {
    e.preventDefault();

    const userMessage = input.trim();

    if (!userMessage || loading) return;

    // Add user message and an empty assistant message
    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
      { role: "assistant", content: "" },
    ]);

    setInput("");
    setLoading(true);
    setHasReceivedChunk(false);

    try {
      await sendChatMessageStream(
        sessionId,
        userMessage,
        (chunk) => {
          // First chunk received
          setHasReceivedChunk(true);

          // Append each chunk to the existing assistant message
          setMessages((prev) => {
            const updatedMessages = [...prev];
            const lastIndex = updatedMessages.length - 1;

            updatedMessages[lastIndex] = {
              ...updatedMessages[lastIndex],
              content: updatedMessages[lastIndex].content + chunk,
            };

            return updatedMessages;
          });
        }
      );

    } catch (error) {
      console.error("Chatbot streaming error:", error);

      setMessages((prev) => {
        const updatedMessages = [...prev];
        const lastIndex = updatedMessages.length - 1;

        const existingContent = updatedMessages[lastIndex].content;

        updatedMessages[lastIndex] = {
          ...updatedMessages[lastIndex],
          content: existingContent
            ? existingContent + "\n\nSorry, the response was interrupted."
            : "Sorry, something went wrong. Please try again.",
        };

        return updatedMessages;
      });

    } finally {
      setLoading(false);
      setHasReceivedChunk(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {/* Chat window */}
      {isOpen && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-label="Chat with Jix, Soumyajit's AI assistant"
          className="flex h-[31rem] max-h-[calc(100vh-7rem)] w-[calc(100vw-2.5rem)] max-w-[27rem] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#222326]/60 backdrop-blur-2xl text-white shadow-[0_20px_60px_rgba(0,0,0,0.55)] motion-safe:animate-[chatIn_0.2s_ease-out]"
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-white/10 bg-[#1b1c1e]/60 px-4 py-3">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-[#222326]">
              {/* <SparkIcon className="h-5 w-5" /> */}
              <img src={assets.jix} alt="" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#1b1c1e] bg-green-400" />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-base font-bold leading-tight">
                Jix <span className="text-yellow-400">AI</span>
              </h2>
              <p className="truncate text-xs text-gray-400">
                Ask about education, skills, projects and experience
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-[#FFC700] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC700]"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={messagesRef}
            data-lenis-prevent
            className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4 [scrollbar-color:#3a3b3f_transparent] [scrollbar-width:thin]"
          >
            {messages.map((message, index) => {
              const isLast = index === messages.length - 1;

              // The empty assistant placeholder doubles as the typing indicator
              const isWaiting =
                isLast &&
                message.role === "assistant" &&
                !message.content &&
                loading &&
                !hasReceivedChunk;

              // Never render an empty assistant bubble
              if (message.role === "assistant" && !message.content && !isWaiting) {
                return null;
              }

              return (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[88%] whitespace-pre-wrap break-words px-4 py-2.5 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "rounded-2xl rounded-br-sm bg-yellow-400 font-medium text-[#222326]"
                        : "rounded-2xl rounded-bl-sm border border-white/10 bg-[#2d2e32] text-gray-100"
                    }`}
                  >
                    {isWaiting ? (
                      <div
                        className="flex h-5 items-center gap-1.5"
                        aria-label="Jix is typing"
                      >
                        <span className="h-2 w-2 rounded-full bg-yellow-400 motion-safe:animate-bounce [animation-delay:-0.3s]" />
                        <span className="h-2 w-2 rounded-full bg-yellow-400 motion-safe:animate-bounce [animation-delay:-0.15s]" />
                        <span className="h-2 w-2 rounded-full bg-yellow-400 motion-safe:animate-bounce" />
                      </div>
                    ) : (
                      message.content
                    )}
                  </div>
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-2 border-t border-white/10 bg-[#1b1c1e]/60 p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              disabled={loading}
              className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#2d2e32] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#FFC700] focus:ring-1 focus:ring-[#FFC700] disabled:opacity-60"
            />

            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-400 text-[#222326] transition hover:bg-[#ffd633] focus:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-yellow-400"
            >
              <SendIcon className="h-5 w-5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating launcher */}
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close AI chat" : "Open AI chat"}
        aria-expanded={isOpen}
        className="group flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-3.5 font-bold text-[#222326] shadow-[0_0px_20px_rgba(255,199,0,0.35)] transition hover:scale-105 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#222326]"
      >
        {isOpen ? (
          <CloseIcon className="h-5 w-5" />
        ) : (
          <SparkIcon className="h-5 w-5" />
          // <img src={assets.jix} alt="" className="w-10"/>
        )}
        <span className="text-sm">{isOpen ? "Close" : "Ask AI"}</span>
      </button>

      {/* Keyframes for the open animation (scoped to this component) */}
      <style>{`
        @keyframes chatIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

/* ---------- Small inline icons (no extra dependencies) ---------- */

function SparkIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2l1.9 5.6L19.5 9.5l-5.6 1.9L12 17l-1.9-5.6L4.5 9.5l5.6-1.9L12 2z" />
      <path d="M19 15l.9 2.6 2.6.9-2.6.9L19 22l-.9-2.6-2.6-.9 2.6-.9L19 15z" />
    </svg>
  );
}

function CloseIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function SendIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M3.4 20.4l17.4-7.5c.8-.3.8-1.5 0-1.8L3.4 3.6c-.7-.3-1.4.4-1.2 1.1L4 10.5l9 1.5-9 1.5-1.8 5.8c-.2.7.5 1.4 1.2 1.1z" />
    </svg>
  );
}

export default Chatbot;
