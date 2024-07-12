import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };
    checkAuthState();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center bg-blue-400">
        <span className="text-4xl text-white">Loading...</span>
      </div>
    );
  }

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
