import { jwtDecode } from "jwt-decode";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthResponse } from "@/models/User";

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextType {
  token: string | null;
  userId: string | null;
  login: (data: AuthResponse) => void;
  logout: () => void;
}

interface Token {
  sub: string;
  iat: number;
  exp: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: AuthContextProps) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("user_id")
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode<Token>(token);

        if (decodedToken.exp * 1000 < Date.now()) {
          logout();
        }
      } catch {
        logout();
      }
    }
  }, [token]);

  const login = (data: AuthResponse) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user_id", data.id);
    setToken(data.token);
    setUserId(data.id);
    navigate("/Home");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    setToken(null);
    setUserId(null);
    navigate("/Login");
  };

  return (
    <AuthContext.Provider value={{ token, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
