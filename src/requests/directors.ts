import { requestInstance } from './requestInstance';
import { DirectorModel } from '../models/DirectorModel';

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
