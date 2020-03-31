import http from '../axios/http';
import { IUser } from '../typings/user';

export const loginAPI = (data: {
  account: string;
  password: string;
}) => {
  return http({
    method: 'post',
    url: '/api/login',
    data,
  });
};

export const registeredUserAPI = (data: IUser) => {
  return http({
    method: 'post',
    url: '/api/user',
    data,
  });
};

export const updateUsersAPI = (data: IUser) => {
  return http({
    method: 'put',
    url: '/api/user',
    data,
  });
};

export const deleteUsersAPI = (data: {
  _id?: (string | number)[],
}) => {
  return http({
    method: 'delete',
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