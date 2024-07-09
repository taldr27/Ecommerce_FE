import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const checkAuthState = async () => {
      try {
        if (storedAccessToken) {
          const response = await axios.get(
            `${import.meta.env.VITE_ENDPOINT_BASE}/user/check-auth/`,
            {
              headers: {
                Authorization: `Bearer ${storedAccessToken}`,
              },
            }
          );
          setUser(response.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      }
    };

    if (storedAccessToken) {
      checkAuthState();
    } else {
      setUser(null);
    }
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
