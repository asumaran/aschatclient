import { MemberShip } from '@/useChatContext';

export function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(new Date(isoDate));
}

export function getMemberFromMemberList(
  activeChannelMemberList: MemberShip[],
  memberId: number,
) {
  return activeChannelMemberList.find((m) => m.id === memberId);
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map((name) => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
