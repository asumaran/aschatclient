import { useState, ReactNode } from 'react';
import { ChatContext, MemberShip, Channel } from './useChatContext';

export function ChatProvider({ children }: { children: ReactNode }) {
  const [activeChannelId, setActiveChannelId] = useState<number>();
  const [activeUserId, setActiveUserId] = useState<number>();
  const [activeChannelMemberList, setActiveChannelMemberList] = useState<
    MemberShip[]
  >([]);
  const [channelList, setChannelList] = useState<Channel[]>([]);
  const [activeUserToken, setActiveUserAccessToken] = useState('');

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
        activeUserToken,
        setActiveUserAccessToken,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
