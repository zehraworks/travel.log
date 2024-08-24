"use client";
import { useContext } from "react";
import { createContext, useState } from "react";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [value, setValue] = useState({
    posts: [],
  });

  return (
    <GlobalContext.Provider
      value={{
        ...value,
        setValue: (data) => {
          setValue({ ...value, ...data });
        },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobal = () => {
  return useContext(GlobalContext);
};
export { useGlobal, GlobalProvider };
