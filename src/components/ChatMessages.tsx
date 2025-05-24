import { getChannelMessages } from '@/api';
import ChatMessage from './ChatMessage';
import { useChatContext } from '@/useChatContext';
import { useQuery } from '@tanstack/react-query';

const ChatMessages = () => {
  const { activeChannelId } = useChatContext();

  const { data: messages = [] } = useQuery<{ content: string }[]>({
    queryKey: ['messages', activeChannelId],
    queryFn: () => getChannelMessages(activeChannelId),
  });

  return messages.length
    ? messages.map((m, i) => <ChatMessage key={i} content={m.content} />)
    : 'No messages';
};

export default ChatMessages;
