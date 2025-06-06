import { MemberShip } from '@/useChatContext';

interface Props {
  member: MemberShip;
}

const ChannelMemberBot = ({ member }: Props) => {
  if (!('bot' in member)) {
    console.error('Expected bot membership but got user membership');
    return null;
  }

  return (
    <div className="rounded-sm p-2 pt-0 pb-0 hover:bg-gray-100">
      <span>
        <span className="text-sm">{member.bot.name}</span>
      </span>
    </div>
  );
};

export default ChannelMemberBot;
