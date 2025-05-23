import { useState, ReactNode } from 'react';
import { ChatContext, MemberShip } from './useChatContext';

export function ChatProvider({ children }: { children: ReactNode }) {
  const [activeChannelId, setActiveChannelId] = useState(1); // TODO: Use a proper default.
  const [activeUserId, setActiveUserId] = useState(1);
  const [activeChannelMemberList, setActiveChannelMemberList] = useState<
    MemberShip[]
  >([]);

  return (
    <ChatContext.Provider
      value={{
        activeChannelId,
        setActiveChannelId,
        activeUserId,
        setActiveUserId,
        activeChannelMemberList,
        setActiveChannelMemberList,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
