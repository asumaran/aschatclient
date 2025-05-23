import { getChannels } from '@/api';
import { useChatContext } from '@/useChatContext';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const ChannelList = () => {
  const { activeChannelId, setActiveChannelId } = useChatContext();

  const { data } = useQuery({
    queryKey: ['channels'],
    queryFn: getChannels,
  });

  function onChannelClickHandler(channelId: number) {
    return (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setActiveChannelId(channelId);
    };
  }

  return (
    <div className="p-5">
      <h2 className="mb-5 border-b pb-2 text-2xl font-medium">
        List of Channels
      </h2>
      {data && (
        <ul>
          {data.map((m) => (
            <li key={m.id}>
              <a
                className={m.id === activeChannelId ? 'font-bold' : ''}
                href={`#${m.id}`}
                onClick={onChannelClickHandler(m.id)}
              >
                {m.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChannelList;
