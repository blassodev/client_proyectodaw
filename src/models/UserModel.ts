import { UsersInterface } from '../requests/users';

export class UserModel {
  private _username: string;
  private _name: string;
  private _surnames: string;
  private _isAdmin: string;

  constructor({ username, name, surnames, isAdmin }: UsersInterface) {
    this._username = username;
    this._name = name;
    this._surnames = surnames;
    this._isAdmin = isAdmin;
  }

  get username(): string {
    return this._username;
  }

  get name(): string {
    return this._name;
  }

  get surnames(): string {
    return this._surnames;
  }

  get isAdmin(): string {
    return this._isAdmin;
  }
}
