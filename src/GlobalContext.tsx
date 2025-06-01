import { useState, ReactNode } from 'react';
import { ChatContext, MemberShip, Channel } from './useChatContext';

export function ChatProvider({ children }: { children: ReactNode }) {
  const [activeChannelId, setActiveChannelId] = useState(1); // TODO: Use a proper default.
  const [activeUserId, setActiveUserId] = useState(1); // TODO: Use active user ID as default.
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
