import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const storedAccessToken = localStorage.getItem("accessToken");
        if (storedAccessToken) {
          setAccessToken(storedAccessToken);
          const response = await axios.get("http://127.0.0.1:8000/api/user/check-auth/", {
            headers: {
              Authorization: `Bearer ${storedAccessToken}`
            }
          });
          setUser(response.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      }
    };

    checkAuthState();
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, setUser: updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
