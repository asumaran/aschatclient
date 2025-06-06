import { MemberShip, UserMemberShip, BotMemberShip } from '@/useChatContext';

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

// Function overloads for getMemberFromMemberList
export function getMemberFromMemberList(
  activeChannelMemberList: MemberShip[],
  memberId: number,
  expectedType: 'user',
): UserMemberShip | undefined;

export function getMemberFromMemberList(
  activeChannelMemberList: MemberShip[],
  memberId: number,
  expectedType: 'bot',
): BotMemberShip | undefined;

export function getMemberFromMemberList(
  activeChannelMemberList: MemberShip[],
  memberId: number,
): UserMemberShip | undefined;

// Implementation with never fallback for type safety
export function getMemberFromMemberList(
  activeChannelMemberList: MemberShip[],
  memberId: number,
  expectedType: 'user' | 'bot' = 'user',
): UserMemberShip | BotMemberShip | undefined {
  const member = activeChannelMemberList.find((m) => m.id === memberId);

  if (!member) {
    return undefined;
  }

  // Validate and return the correct type based on expectedType
  if (member.type !== expectedType) {
    console.error(
      `Expected ${expectedType} membership but got ${member.type} membership`,
    );
    return undefined;
  }

  // Type narrowing with exhaustive check
  switch (expectedType) {
    case 'user': {
      return member as UserMemberShip;
    }
    case 'bot': {
      return member as BotMemberShip;
    }
    default: {
      // This ensures compile-time safety - if a new type is added to the union,
      // TypeScript will error here until this case is handled
      const _exhaustiveCheck: never = expectedType;
      console.error('Unexpected member type:', _exhaustiveCheck);
      return undefined;
    }
  }
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map((name) => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
