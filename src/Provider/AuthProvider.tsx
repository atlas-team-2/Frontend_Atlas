import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authStorage } from '@/client/api/auth-storage';
import { getMeRequest, loginRequest, logoutRequest, registerRequest, User } from '@/client/api/api';

interface AuthContextValue {
  user: User | null;
  isAuth: boolean;
  isLoading: boolean;
  scopes: string[];
  login: (email: string, password: string) => Promise<void>;
  register: (payload: { email: string; password: string; display_name?: string }) => Promise<void>;
  logout: () => Promise<void>;
  hasScope: (scope: string) => boolean;
  hasAnyScope: (scopes: string[]) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const scopes = user?.scopes ?? authStorage.getScope();

  useEffect(() => {
    const token = authStorage.getAccessToken();

    if (!token) {
      setIsLoading(false);
      return;
    }

    getMeRequest()
      .then((me) => setUser(me))
      .catch(() => {
        authStorage.clear();
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const tokenPair = await loginRequest({ email, password });
    authStorage.setToken(tokenPair);

    const me = await getMeRequest();
    setUser(me);
  };

  const register = async (payload: { email: string; password: string; display_name?: string }) => {
    await registerRequest(payload);
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } finally {
      authStorage.clear();
      setUser(null);
    }
  };

  const hasScope = (scope: string) => scopes.includes(scope);

  const hasAnyScope = (requiredScopes: string[]) =>
    requiredScopes.some((scope) => scopes.includes(scope));

  const value = useMemo(
    () => ({
      user,
      isAuth: Boolean(user),
      isLoading,
      scopes,
      login,
      register,
      logout,
      hasScope,
      hasAnyScope,
    }),
    [user, isLoading, scopes]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used inside AuthProvider');
  }

  return context;
}
