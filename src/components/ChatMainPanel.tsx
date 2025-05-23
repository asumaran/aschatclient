import { useChatContext } from '@/useChatContext';
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
  } = useChatContext();

  const { data } = useQuery<
    {
      id: number;
      name: string;
      email: string;
      user: { name: string; email: string };
    }[]
  >({
    queryKey: ['members', activeChannelId],
    queryFn: async () => {
      const members = await getMembers(activeChannelId);
      console.log('seteamos member list');
      setActiveChannelMemberList(members);
      return members;
    },
  });

  console.log('data', data);

  const currentUserIsMemberOfActiveChannel = activeChannelMemberList.find(
    (m) => {
      return m.id === activeUserId;
    },
  );

  console.log({ currentUserIsMemberOfActiveChannel });

  return (
    <div className="flex h-full">
      {currentUserIsMemberOfActiveChannel ? (
        <>
          <div className="flex flex-1 flex-col p-5 pr-0">
            <div className="flex-1 overflow-auto border-1 p-5">
              <ChatMessages />
            </div>
            <div className="mt-5 border-1 p-5">
              <MessageForm />
            </div>
          </div>
          <div className="m-5 border-1">
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
