import Koa from 'koa';
import koaStatic from 'koa-static';
import bodyParser from 'koa-bodyparser';
import colors from 'colors';
import path from 'path';
import cors from 'koa2-cors';

import { staticPath, } from './constant/gloabal';
import config from './config';
import router from './routes';
import './mongo';

const app = new Koa();
const port = config.port;

app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(bodyParser());
app.use(koaStatic(staticPath));
app.use(router.routes()).use(router.allowedMethods());
app.listen(port, () => {
  console.log(colors.bold(`\n\n\nServer listening at port ${port}\n\n\n`).green);
});
