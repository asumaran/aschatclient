import { ChannelMessage } from '@/api';
import { formatDate, getInitials } from '@/utils/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { BotMemberShip } from '@/useChatContext';
import TimeAgo from 'timeago-react';
import { memo } from 'react';

interface Props {
  message: ChannelMessage;
  member: BotMemberShip;
}

const BotMessage = (props: Props) => {
  const {
    message: { createdAt, content },
    member,
  } = props;

  return (
    <div className="group flex gap-3 rounded-md p-2 py-2 hover:bg-gray-50">
      <div>
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>{getInitials(member.member.name)}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1">
        <div className="mb-1 text-sm">
          <span className="pr-1 font-semibold">{member.member.name}</span>
          <span className="text-xs text-gray-400" title={formatDate(createdAt)}>
            <TimeAgo datetime={createdAt} live={false} />
          </span>
        </div>
        <div className="text-sm">{content}</div>
      </div>
    </div>
  );
};

export default memo(BotMessage);
