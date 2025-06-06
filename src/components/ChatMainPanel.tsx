import { MemberShip, useChatContext } from '@/useChatContext';
import ChannelMembers from './ChannelMembers';
import ChatMessages from './ChatMessages';
import MessageForm from './MessageForm';
import NotAChannelMember from './NotAChannelMember';
import { getMembers } from '@/api';
import { useQuery } from '@tanstack/react-query';

const ChatMainPanel = () => {
  const {
    activeChannelMemberList,
    activeChannelId,
    activeUserId,
    setActiveChannelMemberList,
    channelList,
  } = useChatContext();

  useQuery<MemberShip[]>({
    queryKey: ['members', activeChannelId],
    queryFn: async () => {
      const members = await getMembers(activeChannelId!);
      setActiveChannelMemberList(members);
      return members;
    },
    enabled: activeChannelId !== undefined && activeUserId !== undefined,
  });

  const currentUserIsMemberOfActiveChannel = activeChannelMemberList.find(
    (m) => {
      return m.type === 'user' && m.member.id === activeUserId;
    },
  );

  const currentChannel = channelList.find((c) => c.id === activeChannelId);

  // If there is no user or no active channel, render nothing.
  if (!activeChannelId || !activeUserId) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex h-full">
      {currentUserIsMemberOfActiveChannel ? (
        <>
          <div className="flex flex-1 flex-col p-2 pr-0">
            <div className="flex-1 overflow-auto border-1 p-2">
              <h2 className="font-bold">#{currentChannel?.name}</h2>
              <ChatMessages />
            </div>
            <div className="mt-2 border-1 p-2">
              <MessageForm />
            </div>
          </div>
          <div className="m-2 border-1">
            <ChannelMembers />
          </div>
        </>
      ) : (
        <NotAChannelMember />
      )}
    </div>
  );
};

export default ChatMainPanel;
