"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface GlobalState {
  posts: any[];
}

interface GlobalContextType {
  posts: any[];
  setValue: (
    data: Partial<GlobalState> | ((prevState: GlobalState) => GlobalState)
  ) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [value, setValue] = useState<GlobalState>({ posts: [] });

  const updateValue = (
    data: Partial<GlobalState> | ((prevState: GlobalState) => GlobalState)
  ) => {
    if (typeof data === "function") {
      setValue((prevValue) => data(prevValue));
    } else {
      setValue((prevValue) => ({ ...prevValue, ...data }));
    }
  };

  return (
    <GlobalContext.Provider value={{ ...value, setValue: updateValue }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobal = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};

export { useGlobal, GlobalProvider };
