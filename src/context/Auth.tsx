import React, { createContext, ReactNode, useState } from 'react';
import { authProvider } from '../auth/authProvider';
import { IAuthUser } from '../requests/login';
import jwtDecode from 'jwt-decode';

interface AuthContextType {
  user: IAuthUser | null;
  signin: (user: IAuthUser, callback: () => void) => void;
  signinToken: (token: string, callback: () => void) => void;
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

  const signinToken = (token: string, callback: () => void) => {
    return authProvider.signin(() => {
      const decoded = jwtDecode<{ user: IAuthUser }>(token);
      setUser(decoded.user);
      callback();
    });
  };

  const signout = (callback: () => void) => {
    return authProvider.signout(() => {
      setUser(null);
      localStorage.removeItem('token');
      callback();
    });
  };

  const value = { user, signin, signinToken, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
