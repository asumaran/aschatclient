import { createContext, useContext } from 'react';

// Base interface for common properties
interface BaseMemberShip {
  id: number;
  channelId: number;
}

// User membership with discriminated union
export interface UserMemberShip extends BaseMemberShip {
  type: 'user';
  member: {
    id: number;
    name: string;
    email: string;
  };
}

// Bot membership with discriminated union
export interface BotMemberShip extends BaseMemberShip {
  type: 'bot';
  member: {
    id: number;
    name: string;
    isActive: boolean;
  };
}

// Union type for MemberShip
export type MemberShip = UserMemberShip | BotMemberShip;

export interface Channel {
  id: number;
  name: string;
}

// Puedes agregar aquí los valores globales que necesites
interface ChatContextType {
  activeChannelId?: number;
  setActiveChannelId: React.Dispatch<React.SetStateAction<number | undefined>>;
  activeUserId?: number;
  setActiveUserId: React.Dispatch<React.SetStateAction<number | undefined>>;
  activeChannelMemberList: MemberShip[];
  setActiveChannelMemberList: React.Dispatch<
    React.SetStateAction<MemberShip[]>
  >;
  channelList: Channel[];
  setChannelList: React.Dispatch<React.SetStateAction<Channel[]>>;
  activeUserToken: string;
  setActiveUserAccessToken: React.Dispatch<React.SetStateAction<string>>;
}

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined,
);

export function useChatContext() {
  const ctx = useContext(ChatContext);

  if (!ctx) {
    throw new Error('useChatContext must be used within ChatProvider');
  }

  return ctx;
}
