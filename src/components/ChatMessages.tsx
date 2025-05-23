import { useEffect, useState } from 'react';
import ChatMessage from './ChatMessage';
import { useChatContext } from '@/useChatContext';

const ChatMessages = () => {
  const { activeChannelId } = useChatContext();

  const [messages, setMessages] = useState<{ content: string }[]>([]);

  useEffect(() => {
    async function getChannelMessages() {
      const response = await fetch(
        `http://localhost:4000/messages/${activeChannelId}`,
      );
      const msgs = await response.json();
      setMessages(msgs);
    }

    getChannelMessages();
  }, [activeChannelId]);

  return messages.length
    ? messages.map((m) => <ChatMessage content={m.content} />)
    : 'No messages';
};

export default ChatMessages;
