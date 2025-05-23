import { getMembers } from '@/api';
import { useChatContext } from '@/useChatContext';
import { useQuery } from '@tanstack/react-query';

const ChannelMembers = () => {
  const { activeChannelId, activeUserId } = useChatContext();

  const { data } = useQuery<
    {
      id: number;
      name: string;
      email: string;
      user: { name: string; email: string };
    }[]
  >({
    queryKey: ['members', activeChannelId],
    queryFn: () => getMembers(activeChannelId),
  });

  return (
    <div className="p-5">
      <h2 className="mb-5 border-b pb-2 text-2xl font-medium">
        List of Members
      </h2>
      {data?.length ? (
        <ul>
          {data.map((m) => (
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
