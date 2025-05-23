import { useState, ReactNode } from 'react';
import { ChatContext } from './useChatContext';

export function ChatProvider({ children }: { children: ReactNode }) {
  const [activeChannelId, setActiveChannelId] = useState<number>(1); // TODO: Use a proper default.
  const [activeUserId, setActiveUserId] = useState(1);

  return (
    <ChatContext.Provider
      value={{
        activeChannelId,
        setActiveChannelId,
        activeUserId,
        setActiveUserId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
