import { useChatContext } from '@/useChatContext';

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
              <span className={m.id === activeUserId ? 'font-bold' : ''}>
                {m.user.name} {'<'}
                {m.user.email}
                {'>'}
              </span>
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
