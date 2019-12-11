import Koa from 'koa';
import koaStatic from 'koa-static';
import bodyParser from 'koa-bodyparser';
import colors from 'colors';

import path from 'path';
import config from './config';
import router from './routes';
import './mongo';

const app = new Koa();
const port = config.port;
const staticPath = './html';

app.use(bodyParser());
app.use(koaStatic(path.join(__dirname, staticPath)));
app.use(router.routes()).use(router.allowedMethods());
app.listen(port, () => {
  console.log(colors.bold(`\n\n\nServer listening at port ${port}\n\n\n`).underline.green);
});
