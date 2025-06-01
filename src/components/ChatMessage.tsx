import { ChannelMessage } from '@/api';
import { MemberShip } from '@/useChatContext';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import TimeAgo from 'timeago-react';

interface Props {
  message: ChannelMessage;
  activeChannelMemberList: MemberShip[];
}
const ChatMessage = (props: Props) => {
  const {
    activeChannelMemberList,
    message: { channelMemberId, content, createdAt },
  } = props;

  const member = getMemberFromMemberList(
    activeChannelMemberList,
    channelMemberId,
  );

  if (member === undefined) {
    console.error('Member not found');
    return;
  }

  return (
    <div className="flex gap-3 rounded-md p-2 py-2 hover:bg-gray-50">
      <div>
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>{getInitials(member.user.name)}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1">
        <div className="mb-1 text-sm">
          <span className="pr-1 font-semibold">{member.user.name}</span>
          <span className="text-xs text-gray-400" title={formatDate(createdAt)}>
            <TimeAgo datetime={createdAt} live={false} />
          </span>
        </div>
        <div className="text-sm">{content}</div>
      </div>
    </div>
  );
};

function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(new Date(isoDate));
}

function getMemberFromMemberList(
  activeChannelMemberList: MemberShip[],
  memberId: number,
) {
  return activeChannelMemberList.find((m) => m.id === memberId);
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((name) => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default ChatMessage;
