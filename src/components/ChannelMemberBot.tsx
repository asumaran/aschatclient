import { BotMemberShip } from '@/useChatContext';

interface Props {
  member: BotMemberShip;
}

const ChannelMemberBot = ({ member }: Props) => {
  return (
    <div className="rounded-sm p-2 pt-0 pb-0 hover:bg-gray-100">
      <span>
        <span className="text-sm">{member.member.name}</span>
      </span>
    </div>
  );
};

export default ChannelMemberBot;
