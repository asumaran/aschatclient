import { MemberShip, useChatContext } from '@/useChatContext';
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
    if (
      typeof activeUserId === 'number' &&
      typeof activeChannelId === 'number'
    ) {
      mutation.mutate({ memberId: activeUserId, channelId: activeChannelId });
    } else {
      console.error('activeUserId or activeChannelId is undefined');
    }
  }

  return (
    <div className="rounded-sm p-2 pt-0 pb-0 hover:bg-gray-100">
      <span className={isActive ? 'font-bold' : ''}>
        <span className="text-sm" title={member.user.email}>
          {member.user.name}
        </span>
      </span>
      {isActive ? (
        <div>
          <a href="#" className="text-xs" onClick={handleLeaveClick}>
            Leave channel
          </a>
        </div>
      ) : null}
    </div>
  );
};

export default ChannelMember;
