import { useChatContext } from '@/useChatContext';
import ChannelMember from './ChannelMember';

const ChannelMembers = () => {
  const { activeUserId, activeChannelMemberList } = useChatContext();

  return (
    <div className="p-2">
      <h2 className="mb-2 border-b pb-2 text-2xl font-medium">Members</h2>
      {activeChannelMemberList.length ? (
        <ul>
          {activeChannelMemberList.map((m) => {
            return (
              <li key={m.id}>
                {m.user ? (
                  <ChannelMember
                    member={m}
                    isActive={activeUserId === m.user.id}
                  />
                ) : (
                  'bot'
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        'No members'
      )}
    </div>
  );
};

export default ChannelMembers;
