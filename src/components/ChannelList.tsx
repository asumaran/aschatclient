import { getChannels } from '@/api';
import { useChatContext, Channel } from '@/useChatContext';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const ChannelList = () => {
  const { activeChannelId, setActiveChannelId, channelList, setChannelList } =
    useChatContext();

  useQuery<Channel[]>({
    queryKey: ['channels'],
    queryFn: async () => {
      const channels = await getChannels();
      setChannelList(channels);
      return channels;
    },
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
      {channelList.length > 0 && (
        <ul>
          {channelList.map((m) => (
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
