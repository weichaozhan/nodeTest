import Router from 'koa-router';

import user from './user';
import login from './login';

const api = new Router();
const returnUse = (url: string, router: Router): any[] => {
  return [url, router.routes(), router.allowedMethods()];
};

api.use(...returnUse('/user', user));
api.use(...returnUse('/login', login));

export default api;
