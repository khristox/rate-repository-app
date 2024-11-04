// MyContext.js
import React, { createContext, useState } from 'react';

export const NavContext = createContext();

export const MyProvider = ({ children },props) => {
  const [value, setValue] = useState(props.provider);

  return (
    <NavContext.Provider value={{ value, setValue }}>
      {children}
    </NavContext.Provider>
  );
};

