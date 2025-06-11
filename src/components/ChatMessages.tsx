import { ChannelMessage, getChannelMessages } from '@/api';
import ChatMessage from './ChatMessage';
import { useChatContext } from '@/useChatContext';
import { useQuery } from '@tanstack/react-query';
import BotMessage from './BotMessage';
import { getMemberFromMemberList } from '@/utils/utils';

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

  const messagesArr = messages.map((m) => {
    if (m.type === 'bot') {
      return (
        <BotMessage
          key={m.id}
          message={m}
          activeChannelMemberList={activeChannelMemberList}
        />
      );
    } else {
      const member = getMemberFromMemberList(
        activeChannelMemberList,
        m.channelMemberId,
        'user',
      );

      if (member === undefined) {
        console.error('User member not found');
        return null;
      }

      return <ChatMessage key={m.id} message={m} member={member} />;
    }
  });

  return messagesArr.length ? messagesArr : 'No messages';
};

export default ChatMessages;
