// hooks/useAiChat.js
import { useState } from "react";
import { useChat } from "react-native-vercel-ai";

export default function useAiChat() {
  const { chat, isLoading } = useChat();
  const [messages, setMessages] = useState([]);

  const sendMessage = async (text) => {
    if (!text?.trim()) return;

    try {
      const response = await chat(text, {
        model: "gpt-5-chat-latest", // choose model
        streaming: true, // optional for streaming responses
      });

      setMessages((prev) => [...prev, { role: "user", content: text }]);
      setMessages((prev) => [...prev, { role: "ai", content: response }]);
    } catch (err) {
      console.error("AI Error:", err);
    }
  };

  return { messages, sendMessage, isLoading };
}
