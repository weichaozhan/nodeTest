export interface IUser {
  _id?: number | string;
  account?: string;
  name: string;
  auth: number[];
  password: string;
  email: string;
  role?: any[],
}