import { requestInstance } from './requestInstance';
import { DirectorInteface, DirectorModel } from '../models/DirectorModel';

export interface DirectorResponse {
  id: number;
  name: string;
  surnames: string;
  bio: string;
  age: number;
}

export const getDirectors = async (): Promise<DirectorModel[]> => {
  const directors = await requestInstance.get<DirectorResponse[]>('directors');

  return directors.data.map(director => new DirectorModel(director));
};

export const createDirector = async (director: DirectorInteface) => {
  await requestInstance.post('directors', director);
};

export const deleteDirector = async (id: number) => {
  await requestInstance.delete(`directors/${id}`);
};

export const deleteDirectors = async (ids: number[]) => {
  await requestInstance.post(`directors/delete`, { ids });
};
