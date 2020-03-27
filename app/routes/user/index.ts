import Router from 'koa-router';

import {
  saveUser,
  removeUser,
  updateUser,
  getUsersList,
} from '../../components/user';

const user = new Router();

user.get('/', getUsersList);
user.put('/', updateUser);
user.delete('/', removeUser);
user.post('/', saveUser);

export default user;
