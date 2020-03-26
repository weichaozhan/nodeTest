import http from '../axios/http';
import { IUser } from '../typings/user';

export const registeredUserAPI = (data: IUser) => {
  return http({
    method: 'post',
    url: '/api/user',
    data,
  });
};

export const getUsersAPI = () => {
  return http({
    method: 'get',
    url: '/api/user',
  });
};