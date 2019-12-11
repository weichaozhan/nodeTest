import Router from 'koa-router';

import {
  saveUser,
} from '../../components/user';

const user = new Router();

user.get('/list', (ctx, next) => {
  ctx.body = [1, 2, 3, 4, 5, 6];
  
  next();
});
user.post('/', saveUser);

export default user;
