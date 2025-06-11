import { ChannelMessage, deleteMessage } from '@/api';
import { UserMemberShip } from '@/useChatContext';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import TimeAgo from 'timeago-react';
import { Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDate, getInitials } from '@/utils/utils';

interface Props {
  message: ChannelMessage;
  member: UserMemberShip;
}
const ChatMessage = (props: Props) => {
  const {
    message: { id: messageId, content, createdAt, channelId },
    member,
  } = props;

  const queryClient = useQueryClient();

  const deleteMessageMutation = useMutation({
    mutationFn: deleteMessage,
    onSuccess: () => {
      // Invalidate messages query to refresh the message list
      queryClient.invalidateQueries({ queryKey: ['messages', channelId] });
    },
    onError: (error) => {
      console.error('Error deleting message:', error);
    },
  });

  function handleDeleteClick() {
    deleteMessageMutation.mutate(messageId);
  }

  return (
    <div className="group flex gap-3 rounded-md p-2 py-2 hover:bg-gray-50">
      <div>
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>{getInitials(member.member.name)}</AvatarFallback>
        </Avatar>
      </div>
      <div className="relative flex-1">
        <div className="mb-1 text-sm">
          <span className="pr-1 font-semibold">{member.member.name}</span>
          <span className="text-xs text-gray-400" title={formatDate(createdAt)}>
            <TimeAgo datetime={createdAt} live={false} />
          </span>
        </div>
        <div className="text-sm">{content}</div>
        <div className="absolute top-0 right-0 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            variant="outline"
            onClick={handleDeleteClick}
            disabled={deleteMessageMutation.isPending}
            size="sm"
          >
            <Trash2 size={12} color="red" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
