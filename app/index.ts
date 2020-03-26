import Koa from 'koa';
import koaStatic from 'koa-static';
import bodyParser from 'koa-bodyparser';
import colors from 'colors';
import path from 'path';
import cors from 'koa2-cors';

import config from './config';
import router from './routes';
import './mongo';

const NODE_ENV = process.env.NODE_ENV;

const app = new Koa();
const port = config.port;

let staticPath: string;

switch(NODE_ENV) {
  case 'development':
    staticPath = '../dist/html';
    break;
  default:
    staticPath = '/html';
    break;
}

app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(bodyParser());
app.use(koaStatic(path.join(__dirname, staticPath)));
app.use(router.routes()).use(router.allowedMethods());
app.listen(port, () => {
  console.log(colors.bold(`\n\n\nServer listening at port ${port}\n\n\n`).green);
});
