import Koa from 'koa';
import koaStatic from 'koa-static';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';

import { staticPath, } from './constant/gloabal';
import router from './routes';
import './mongo';

const app = new Koa();

app.use(cors({
  origin: 'http://localhost:3009',
}));
app.use(bodyParser());
app.use(koaStatic(staticPath));
app.use(router.routes()).use(router.allowedMethods());

export default app;
