export interface IUser {
  _id?: number | string;
  name: string;
  auth: number[];
  password: string;
  email: string;
}