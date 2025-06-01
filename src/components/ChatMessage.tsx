import { ChannelMessage } from '@/api';
import { MemberShip } from '@/useChatContext';

interface Props {
  message: ChannelMessage;
  activeChannelMemberList: MemberShip[];
}
const ChatMessage = (props: Props) => {
  const {
    activeChannelMemberList,
    message: { channelMemberId, content },
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
    <div className="p-b5 mb-5 border-b pb-2">
      <span title={member.user.email}>{member.user.name}</span> : {content}
    </div>
  );
};

function getMemberFromMemberList(
  activeChannelMemberList: MemberShip[],
  memberId: number,
) {
  return activeChannelMemberList.find((m) => m.id === memberId);
}

export default ChatMessage;
