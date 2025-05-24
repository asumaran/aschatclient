import { MemberShip, useChatContext } from '@/useChatContext';
import { Button } from './ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { leaveChannel } from '@/api';

const ChannelMember = ({
  member,
  isActive,
}: {
  member: MemberShip;
  isActive: boolean;
}) => {
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
      const result = leaveChannel(memberId, channelId);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['members', activeChannelId],
      });
    },
  });

  function handleLeaveClick() {
    console.log('x');
    mutation.mutate({ memberId: activeUserId, channelId: activeChannelId });
  }

  return (
    <div className="flex items-center border-b p-2">
      <div className="mr-2">
        <span className={isActive ? 'font-bold' : ''}>
          <span className="mr-1">{member.user.name}</span>
          <span className="font-mono text-xs text-gray-400 lowercase">
            {'<'}
            {member.user.email}
            {'>'}
          </span>
        </span>
      </div>
      {isActive ? (
        <div>
          <Button variant="link" onClick={handleLeaveClick}>
            Leave channel
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default ChannelMember;
