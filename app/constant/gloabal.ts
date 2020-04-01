import path from 'path';

const NODE_ENV = process.env.NODE_ENV;

let staticPath: string;

switch(NODE_ENV) {
  case 'development':
    staticPath = path.join(__dirname, '../../dist/html');
    break;
  default:
    staticPath = path.join(__dirname, '../html');
    break;
}

const signSecrect = 'token';

export {
  staticPath,
  signSecrect,
};