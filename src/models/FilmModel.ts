import { FilmResponse, Movie } from '../requests/film';
import { DateTime } from 'luxon';

export class FilmModel {
  private _movie: Movie;
  private _assignedAt: Date;
  private _expiresInMinutes: number;
  private _expiresAt: Date;

  constructor({ movie, assignedAt, expiresInMinutes }: FilmResponse) {
    this._movie = movie;
    this._assignedAt = assignedAt;
    this._expiresInMinutes = expiresInMinutes;
    this._expiresAt = DateTime.fromJSDate(this._assignedAt)
      .plus({
        minutes: this._expiresInMinutes,
      })
      .toJSDate();
  }

  get movie(): Movie {
    return this._movie;
  }

  get assignedAt(): Date {
    return this._assignedAt;
  }

  get expiresAt(): Date {
    return this._expiresAt;
  }

  get expiresInMinutes() {
    return DateTime.fromJSDate(this._expiresAt).diff(DateTime.now(), 'minutes');
  }
}
