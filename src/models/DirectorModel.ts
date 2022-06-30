import { DirectorResponse } from '../requests/directors';

export class DirectorModel {
  private _id: number;
  private _name: string;
  private _surnames: string;
  private _bio: string;
  private _age: number;

  constructor(data: DirectorResponse) {
    this._id = data.id;
    this._name = data.name;
    this._surnames = data.surnames;
    this._bio = data.bio;
    this._age = data.age;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get surnames(): string {
    return this._surnames;
  }

  get bio(): string {
    return this._bio;
  }

  get age(): number {
    return this._age;
  }

  get fullName(): string {
    return this._name + ' ' + this._surnames;
  }
}
