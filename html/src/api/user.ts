import http from '../axios/http';

export const registeredUser = (data: any) => {
  return http({
    method: 'post',
    url: '/api/user',
    data,
  });
};