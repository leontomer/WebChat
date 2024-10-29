import React, { useState } from "react";
import { AppContext } from "./AppContext";

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(null);
  const [currentChatUser, setCurrentChatUser] = useState<string | null>(null);

  return (
    <AppContext.Provider
      value={{ user, setUser, currentChatUser, setCurrentChatUser }}
    >
      {children}
    </AppContext.Provider>
  );
};
