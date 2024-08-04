import { useState } from 'react';

interface Message {
  question: string;
  answer: string;
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async (question: string, user_id: string) => {
    setMessages([...messages, { question, answer: '...' }]);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, user_id })
      });
      if (response.ok) {
        const data = await response.json();
        setMessages((msgs) =>
          msgs.map((msg, idx) =>
            idx === msgs.length - 1 ? { ...msg, answer: data.answer } : msg
          )
        );
      } else {
        setMessages((msgs) => msgs.filter((_, idx) => idx !== msgs.length - 1));
      }
    } catch (error) {
      setMessages((msgs) => msgs.filter((_, idx) => idx !== msgs.length - 1));
    }
  };

  const clearMessages = () => setMessages([]);

  return { messages, sendMessage, clearMessages };
};
