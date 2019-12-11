import defaultConf from './default';
import devConf from './development';

const env: string | undefined = process.env.NODE_ENV;
let config: IConfig;

switch (env) {
  case 'development':
    config = devConf;
    break;
  default:
    config = defaultConf;
    break;
}

export default config;
