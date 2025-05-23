import { createContext, useContext } from 'react';

export interface MemberShip {
  id: number;
  name: string;
  email: string;
  user: { name: string; email: string };
}

// Puedes agregar aquí los valores globales que necesites
interface ChatContextType {
  activeChannelId: number;
  setActiveChannelId: React.Dispatch<React.SetStateAction<number>>;
  activeUserId: number;
  setActiveUserId: React.Dispatch<React.SetStateAction<number>>;
  activeChannelMemberList: MemberShip[];
  setActiveChannelMemberList: React.Dispatch<
    React.SetStateAction<MemberShip[]>
  >;
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
