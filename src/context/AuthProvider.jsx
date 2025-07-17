import React, { createContext, useState } from "react";
import { useContext } from "react";
const AuthContext = createContext(null);
//create a custom hook
export const useAuth = () => useContext(AuthContext);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
