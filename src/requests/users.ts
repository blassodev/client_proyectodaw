import { requestInstance } from './requestInstance';
import { UserModel } from '../models/UserModel';

export interface UsersInterface {
  username: string;
  name: string;
  surnames: string;
  isAdmin: string;
}

export interface UsersAddInterface {
  username: string;
  name: string;
  surnames: string;
  password: string;
}

export const getUsers = async () => {
  const userResponse = await requestInstance.get<UsersInterface[]>('users');

  return userResponse.data.map(user => new UserModel(user));
};

export const createUser = async (data: UsersAddInterface) => {
  await requestInstance.post('users', data);
};
