import { ChannelMessage } from '@/api';
import {
  formatDate,
  getInitials,
  getMemberFromMemberList,
} from '@/utils/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { MemberShip } from '@/useChatContext';
import TimeAgo from 'timeago-react';

interface Props {
  activeChannelMemberList: MemberShip[];
  message: ChannelMessage;
}

const BotMessage = (props: Props) => {
  const {
    message: { channelMemberId, createdAt, content },
    activeChannelMemberList,
  } = props;
  // Get author
  const membership = getMemberFromMemberList(
    activeChannelMemberList, // Esto deberia retornar el bot tambien.
    channelMemberId,
  );

  if (!membership) {
    console.error('Bot member not found');
    return null;
  }

  // Type guard to ensure we have a bot membership
  if (!('bot' in membership)) {
    console.error('Expected bot membership but got user membership');
    return null;
  }

  return (
    <div className="group flex gap-3 rounded-md p-2 py-2 hover:bg-gray-50">
      <div>
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>{getInitials(membership.bot.name)}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1">
        <div className="mb-1 text-sm">
          <span className="pr-1 font-semibold">{membership.bot.name}</span>
          <span className="text-xs text-gray-400" title={formatDate(createdAt)}>
            <TimeAgo datetime={createdAt} live={false} />
          </span>
        </div>
        <div className="text-sm">{content}</div>
      </div>
    </div>
  );
};

export default BotMessage;
