import { requestNoTokenInstance } from './requestInstance';
import { getUser } from '../utils/getUser';

export interface LoginResponse {
  status: 'ok' | 'error';
  token: string;
}

export interface User {
  username: string;
  name: string;
  surnames: string;
  isAdmin: boolean;
}

export interface IJWT {
  user: User;
  iat: number;
  exp: number;
}

export interface IAuthUser extends User {
  token: string;
}

export const postLogin = async (
  user: string,
  password: string
): Promise<IAuthUser> => {
  const userResponse = await requestNoTokenInstance.post<LoginResponse>(
    'login',
    { user, password }
  );
  return getUser.fromToken(userResponse.data.token);
};
