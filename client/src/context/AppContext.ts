import { createContext } from "react";

interface AppContextType {
  user: string | null;
  setUser: (user: string | null) => void;
  currentChatUser: string | null;
  setCurrentChatUser: (chatUser: string | null) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
