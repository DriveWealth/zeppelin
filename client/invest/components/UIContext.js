import React, { createContext } from "react";

export const UIContext = createContext({});

export const UIProvider = ({children, handleClose}) => {
    return <UIContext.Provider
    value={{
      handleClose,
    }}
  >
    {children}
  </UIContext.Provider>
}
export default UIProvider

