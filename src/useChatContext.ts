import { createContext, useContext } from 'react';

// Puedes agregar aquí los valores globales que necesites
interface ChatContextType {
  activeChannelId: number;
  setActiveChannelId: React.Dispatch<React.SetStateAction<number>>;
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
