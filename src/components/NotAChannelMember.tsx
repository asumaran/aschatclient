import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from './ui/button';
import { joinChannel } from '@/api';
import { useChatContext } from '@/useChatContext';

const NotAChannelMember = () => {
  const { activeChannelId, activeUserId, channelList } = useChatContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      memberId,
      channelId,
    }: {
      memberId: number;
      channelId: number;
    }) => {
      const result = joinChannel(memberId, channelId);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['members', activeChannelId],
      });
    },
  });

  function handleClick(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (activeChannelId === undefined || activeUserId === undefined) {
      console.error('Active channel ID or user ID is undefined');
      return;
    }

    mutation.mutate({ channelId: activeChannelId, memberId: activeUserId });
  }

  const currentChannel = channelList.find((c) => c.id === activeChannelId);

  return (
    <div className="flex-1 place-content-center p-5 text-center">
      <p className="mb-5">
        You're not a member of{' '}
        {currentChannel ? `#${currentChannel.name}` : '…'}. Would you like to
        join?
      </p>
      <Button onClick={handleClick}>
        {mutation.isPending ? 'Joining Channel…' : 'Join Channel'}
      </Button>
    </div>
  );
};

export default NotAChannelMember;
