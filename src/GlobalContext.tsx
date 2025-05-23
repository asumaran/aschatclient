import { useState, ReactNode } from 'react';
import { ChatContext } from './useChatContext';

export function ChatProvider({ children }: { children: ReactNode }) {
  const [activeChannelId, setActiveChannelId] = useState<number>(1); // TODO: Use a proper default.

  return (
    <ChatContext.Provider value={{ activeChannelId, setActiveChannelId }}>
      {children}
    </ChatContext.Provider>
  );
}
