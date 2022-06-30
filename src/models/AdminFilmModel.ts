import { Director } from '../requests/film';
import { DateTime } from 'luxon';

export interface IUser {
  id: number;
  username: string;
  name: string;
  surnames: string;
  isAdmin: boolean;
}

export interface UserData {
  userId: number;
  movieId: number;
  assignedAt: string;
  expiresInMinutes: number;
  user: IUser;
}

interface ProUserData extends Omit<UserData, 'assignedAt'> {
  assignedAt: Date;
  expiresAt: Date;
}

export interface AdminFilmData {
  id: number;
  name: string;
  movieDirectorId: number;
  year: number;
  score: number;
  imageUrl: string;
  users: UserData[];
  director: Director;
}

export class AdminFilmModel {
  private _id: number;
  private _name: string;
  private _directorId: number;
  private _year: number;
  private _score: number;
  private _imageUrl: string;
  private _users: ProUserData[];
  private _director: Director;

  constructor(data: AdminFilmData) {
    this._id = data.id;
    this._name = data.name;
    this._directorId = data.movieDirectorId;
    this._year = data.year;
    this._score = data.score;
    this._imageUrl = data.imageUrl;
    this._director = data.director;

    this._users = data.users.map((user: UserData) => {
      const assignedAt = new Date(user.assignedAt);
      const expiresAt = DateTime.fromJSDate(assignedAt)
        .plus({ minutes: user.expiresInMinutes })
        .toJSDate();
      return {
        ...user,
        assignedAt,
        expiresAt,
      };
    });
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get directorId(): number {
    return this._directorId;
  }

  get year(): number {
    return this._year;
  }

  get score(): number {
    return this._score;
  }

  get imageUrl(): string {
    return this._imageUrl;
  }

  get users(): ProUserData[] {
    return this._users;
  }

  get director(): Director {
    return this._director;
  }
}
