import { useChatContext } from '@/useChatContext';
import ChannelMember from './ChannelMember';

const ChannelMembers = () => {
  const { activeUserId, activeChannelMemberList } = useChatContext();

  return (
    <div className="p-5">
      <h2 className="mb-5 border-b pb-2 text-2xl font-medium">
        List of Members
      </h2>
      {activeChannelMemberList.length ? (
        <ul>
          {activeChannelMemberList.map((m) => (
            <li key={m.id}>
              <ChannelMember member={m} isActive={activeUserId === m.user.id} />
            </li>
          ))}
        </ul>
      ) : (
        'No members'
      )}
    </div>
  );
};

export default ChannelMembers;
