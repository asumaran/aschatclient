import { useEffect, useState } from 'react';
import ChatMessage from './ChatMessage';

const ChatMessages = () => {
  const [messages, setMessages] = useState<{ content: string }[]>([]);

  useEffect(() => {
    async function getChannelMessages() {
      const channelId = 1;
      const response = await fetch(
        `http://localhost:4000/messages/${channelId}`,
      );
      const msgs = await response.json();
      setMessages(msgs);
    }

    getChannelMessages();
  }, []);

  return messages.map((m) => <ChatMessage content={m.content} />);
};

export default ChatMessages;
