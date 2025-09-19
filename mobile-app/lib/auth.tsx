import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

const SessionContext = createContext<{ session: string | null; setSession: (session: string | null) => void; isLoading: boolean }>({ session: null, setSession: () => {}, isLoading: true });

export function useSession() {
  return useContext(SessionContext);
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      const token = await SecureStore.getItemAsync('session');
      setSession(token);
      setIsLoading(false);
    };

    loadSession();
  }, []);

  const value = {
    session,
    setSession: (token: string | null) => {
      setSession(token);
      if (token) {
        SecureStore.setItemAsync('session', token);
      } else {
        SecureStore.deleteItemAsync('session');
      }
    },
    isLoading,
  };

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}
