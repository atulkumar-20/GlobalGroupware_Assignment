import { useState, ReactNode } from 'react';
import { AuthContext } from './AuthContext.context';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  );
  const [userEmail, setUserEmail] = useState<string | null>(
    localStorage.getItem('userEmail')
  );

  const value = {
    token,
    userEmail,
    setToken: (newToken: string | null) => {
      setToken(newToken);
      if (newToken) {
        localStorage.setItem('token', newToken);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        setUserEmail(null);
      }
    },
    setUserEmail: (email: string | null) => {
      setUserEmail(email);
      if (email) {
        localStorage.setItem('userEmail', email);
      } else {
        localStorage.removeItem('userEmail');
      }
    },
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
