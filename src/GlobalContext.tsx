import { useState, ReactNode, useEffect } from 'react';
import { ChatContext, MemberShip, Channel } from './useChatContext';

export function ChatProvider({ children }: { children: ReactNode }) {
  const [activeChannelId, setActiveChannelId] = useState<number>();
  const [activeUserId, setActiveUserId] = useState<number | undefined>(() => {
    const saved = localStorage.getItem('activeUserId');
    return saved ? Number(saved) : undefined;
  });

  const [activeChannelMemberList, setActiveChannelMemberList] = useState<
    MemberShip[]
  >([]);
  const [channelList, setChannelList] = useState<Channel[]>([]);
  const [activeUserToken, setActiveUserAccessToken] = useState(() => {
    return localStorage.getItem('activeUserToken') || '';
  });

  // Persist activeUserId in localStorage when it changes
  useEffect(() => {
    if (activeUserId) {
      localStorage.setItem('activeUserId', activeUserId.toString());
    } else {
      localStorage.removeItem('activeUserId');
    }
  }, [activeUserId]);

  // Persist token in localStorage when it changes
  useEffect(() => {
    if (activeUserToken) {
      localStorage.setItem('activeUserToken', activeUserToken);
    } else {
      localStorage.removeItem('activeUserToken');
    }
  }, [activeUserToken]);

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
