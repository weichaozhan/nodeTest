import Router from 'koa-router';
import api from './api';
import fs from 'fs';

import { staticPath, } from '../constant/gloabal';

const router = new Router();

router.use('/api', api.routes(), api.allowedMethods());

/**
 * 无效路由重定向到页面首页
 */
router.all(/^(?!\/api\/)/, (ctx, next) => {
  // ctx.redirect('/');
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream(`${staticPath}/index.html`);
  next();
});

export default router;