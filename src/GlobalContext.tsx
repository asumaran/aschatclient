import { useState, ReactNode } from 'react';
import { ChatContext, MemberShip, Channel } from './useChatContext';

export function ChatProvider({ children }: { children: ReactNode }) {
  const [activeChannelId, setActiveChannelId] = useState(1); // TODO: Use a proper default.
  const [activeUserId, setActiveUserId] = useState(1);
  const [activeChannelMemberList, setActiveChannelMemberList] = useState<
    MemberShip[]
  >([]);
  const [channelList, setChannelList] = useState<Channel[]>([]);

  return (
    <ChatContext.Provider
      value={{
        activeChannelId,
        setActiveChannelId,
        activeUserId,
        setActiveUserId,
        activeChannelMemberList,
        setActiveChannelMemberList,
        channelList,
        setChannelList,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
