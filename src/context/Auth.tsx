import React, { createContext, ReactNode, useState } from 'react';
import { authProvider } from '../auth/authProvider';
import { IAuthUser } from '../requests/login';

interface AuthContextType {
  user: IAuthUser | null;
  signin: (user: IAuthUser, callback: () => void) => void;
  signout: (callback: () => void) => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IAuthUser | null>(null);

  const signin = (newUser: IAuthUser, callback: () => void) => {
    return authProvider.signin(() => {
      localStorage.setItem('token', newUser.token);
      setUser(newUser);
      callback();
    });
  };

  const signout = (callback: () => void) => {
    return authProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
