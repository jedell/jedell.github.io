import React from "react";

export const DarkModeProvider = React.createContext();

export const useDarkMode = () => React.useContext(DarkModeProvider);
