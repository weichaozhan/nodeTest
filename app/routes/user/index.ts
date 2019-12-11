import Router from 'koa-router';

import {
  saveUser,
  getUsersList,
} from '../../components/user';

const user = new Router();

user.get('/', getUsersList);
user.post('/', saveUser);

export default user;
