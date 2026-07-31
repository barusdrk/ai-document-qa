import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  login,
  register,
  setAuthToken,
  type User,
} from "../services/api";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;

  login: (
    data: LoginData
  ) => Promise<void>;

  register: (
    data: RegisterData
  ) => Promise<void>;

  logout: () => void;
}

const AuthContext =
  createContext<AuthContextValue | null>(
    null
  );

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    const storedUser =
      localStorage.getItem("user");

    if (
      token &&
      storedUser
    ) {
      try {
        setAuthToken(token);

        setUser(
          JSON.parse(storedUser)
        );
      } catch {
        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );

        setAuthToken(null);
      }
    }

    setLoading(false);
  }, []);

  async function handleLogin(
    data: LoginData
  ) {
    const response =
      await login(data);

    localStorage.setItem(
      "token",
      response.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(
        response.user
      )
    );

    setAuthToken(
      response.token
    );

    setUser(
      response.user
    );
  }

  async function handleRegister(
    data: RegisterData
  ) {
    const response =
      await register(
        data
      );

    localStorage.setItem(
      "token",
      response.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(
        response.user
      )
    );

    setAuthToken(
      response.token
    );

    setUser(
      response.user
    );
  }

  function logout() {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setAuthToken(null);

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login:
          handleLogin,
        register:
          handleRegister,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider."
    );
  }

  return context;
}
