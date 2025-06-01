import { ChannelMessage, getChannelMessages } from '@/api';
import ChatMessage from './ChatMessage';
import { useChatContext } from '@/useChatContext';
import { useQuery } from '@tanstack/react-query';

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
  });

  return messages.length
    ? messages.map((m, i) => (
        <ChatMessage
          key={i}
          message={m}
          activeChannelMemberList={activeChannelMemberList}
        />
      ))
    : 'No messages';
};

export default ChatMessages;
