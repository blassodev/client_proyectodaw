import jwtDecode from 'jwt-decode';
import { IAuthUser, IJWT } from '../requests/login';

export const getUser = {
  fromToken: (token: string): IAuthUser => {
    const decodedUser = jwtDecode<IJWT>(token);
    return { ...decodedUser.user, token };
  },
};
