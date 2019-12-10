import Koa from 'koa';
import koaStatic from 'koa-static';

import path from 'path';

import tools from './tools';

const app = new Koa();
const port = 8089;
const staticPath = './html';

app.use(koaStatic(path.join(__dirname, staticPath)));
app.listen(port, () => {
  tools.log('green', `\n\n\nServer listening at port ${port}\n\n\n`);
});

// import './nodeBaseTest/test';
// import './nodeBaseTest/fileOption';
// import './nodeBaseTest/network';
// import './nodeBaseTest/process';
// import './nodeBaseTest/crypto';


