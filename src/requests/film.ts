import { requestInstance } from './requestInstance';
import { FilmModel } from 'models/FilmModel';
import { AdminFilmData, AdminFilmModel } from '../models/AdminFilmModel';

export interface Director {
  id: number;
  name: string;
  surnames: string;
  bio: string;
  age: number;
}

export interface Movie {
  id: number;
  name: string;
  movieDirectorId: number;
  year: number;
  score: number;
  imageUrl: string;
  director: Director;
}

export interface FilmResponse {
  userId: number;
  movieId: number;
  assignedAt: Date;
  expiresInMinutes: number;
  movie: Movie;
}
export interface UpdateFilmInput {
  name: string;
  year: number;
  score: number;
  imageUrl: string;
  directorId: number;
}

export const getFilms = async (): Promise<FilmModel[]> => {
  const filmsResponse = await requestInstance.get<FilmResponse[]>('films');

  return filmsResponse.data.map(film => new FilmModel(film));
};

export const getAllFilms = async (): Promise<AdminFilmModel[]> => {
  const allFilmsResponse = await requestInstance.get<AdminFilmData[]>(
    'films/admin'
  );

  return allFilmsResponse.data.map(film => new AdminFilmModel(film));
};

export const deleteFilm = async (id: number) => {
  await requestInstance.delete('films/admin/' + id);
};

export const deleteFilms = async (ids: number[]) => {
  await requestInstance.post('films/admin/delete', { ids });
};

export const updateFilm = async (id: number, data: UpdateFilmInput) => {
  await requestInstance.put('films/admin/' + id, data);
};

export const createFilm = async (data: UpdateFilmInput) => {
  await requestInstance.post('films/admin/', data);
};
