import { ChannelMessage, getChannelMessages } from '@/api';
import ChatMessage from './ChatMessage';
import { useChatContext } from '@/useChatContext';
import { useQuery } from '@tanstack/react-query';
import BotMessage from './BotMessage';

const ChatMessages = () => {
  const { activeChannelId, activeChannelMemberList } = useChatContext();

  const { data: messages = [] } = useQuery<ChannelMessage[]>({
    queryKey: ['messages', activeChannelId],
    queryFn: () => {
      if (!activeChannelId) {
        return [];
      }

      return getChannelMessages(activeChannelId);
    },
    enabled: activeChannelId !== undefined,
    refetchInterval: 5000, // Poll every 5 seconds
    refetchIntervalInBackground: false, // Only poll when window is in focus
  });

  return messages.length
    ? messages.map((m, i) => {
        return m.type === 'bot' ? (
          <BotMessage
            key={i}
            message={m}
            activeChannelMemberList={activeChannelMemberList}
          />
        ) : (
          <ChatMessage
            key={i}
            message={m}
            activeChannelMemberList={activeChannelMemberList}
          />
        );
      })
    : 'No messages';
};

export default ChatMessages;
