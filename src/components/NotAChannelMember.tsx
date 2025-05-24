import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from './ui/button';
import { joinChannel } from '@/api';
import { useChatContext } from '@/useChatContext';

const NotAChannelMember = () => {
  const { activeChannelId, activeUserId } = useChatContext();
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
    mutation.mutate({ channelId: activeChannelId, memberId: activeUserId });
  }

  return (
    <div className="flex-1 place-content-center p-5 text-center">
      <p className="mb-5">
        You're not a member of this channel. Would you like to join?
      </p>
      <Button onClick={handleClick}>
        {mutation.isPending ? 'Joining Channel…' : 'Join Channel'}
      </Button>
    </div>
  );
};

export default NotAChannelMember;
