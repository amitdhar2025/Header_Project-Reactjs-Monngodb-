import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const initialAuthUser = localStorage.getItem("Users");
  const [authUser, setAuthUser] = useState(
    initialAuthUser ? JSON.parse(initialAuthUser) : undefined
  );

  // Save authUser to localStorage whenever it changes
  React.useEffect(() => {
    if (authUser) {
      // Ensure token is included in authUser object
      if (!authUser.token && authUser.accessToken) {
        authUser.token = authUser.accessToken;
      }
      localStorage.setItem("Users", JSON.stringify(authUser));
      if (authUser.token) {
        localStorage.setItem("token", authUser.token);
      }
    } else {
      localStorage.removeItem("Users");
      localStorage.removeItem("token");
    }
  }, [authUser]);

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
