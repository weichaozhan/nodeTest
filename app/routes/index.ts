import Router from 'koa-router';
import api from './api';

const router = new Router();

router.use('/api', api.routes(), api.allowedMethods());

/**
 * 无效路由重定向到页面首页
 */
router.all(/^(?!\/api\/)/, (ctx, next) => {
  ctx.redirect('/');
});

export default router;