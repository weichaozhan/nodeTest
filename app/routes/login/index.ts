import Router from 'koa-router';

import {
  login,
} from '../../components/login';

const loginRoute = new Router();

loginRoute.post('/', login);

export default loginRoute;
