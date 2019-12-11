import Router from 'koa-router';

import user from './user';

const api = new Router();
const returnUse = (url: string, router: Router): any[] => {
  return [url, router.routes(), router.allowedMethods()];
};

api.use(...returnUse('/user', user));

export default api;
