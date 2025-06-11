import { ChannelMessage, getChannelMessages } from '@/api';
import ChatMessage from './ChatMessage';
import {
  BotMemberShip,
  useChatContext,
  UserMemberShip,
} from '@/useChatContext';
import { useQuery } from '@tanstack/react-query';
import BotMessage from './BotMessage';

// Simple cache: { memberId: member }
let userMemberCache: { [memberId: number]: UserMemberShip } = {};
let botMemberCache: { [memberId: number]: BotMemberShip } = {};
let cacheChannelId: number | undefined;

const ChatMessages = () => {
  const { activeChannelId, activeChannelMemberList } = useChatContext();

  // Build cache if channel changed, build complete cache upfront for stable references
  if (cacheChannelId !== activeChannelId) {
    userMemberCache = {};
    botMemberCache = {};
    cacheChannelId = activeChannelId;
    // Build complete cache to ensure stable object references
    activeChannelMemberList.forEach((member) => {
      if (member.type === 'user') {
        userMemberCache[member.id] = member;
      } else if (member.type === 'bot') {
        botMemberCache[member.id] = member;
      }
    });
  }

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
      const member = botMemberCache[m.channelMemberId];
      return <BotMessage key={m.id} message={m} member={member} />;
    } else if (m.type === 'user') {
      const member = userMemberCache[m.channelMemberId];
      return <ChatMessage key={m.id} message={m} member={member} />;
    } else {
      console.error('Unknown message type:', m.type);
      return null;
    }
  });

  return messagesArr.length ? messagesArr : 'No messages';
};

export default ChatMessages;
