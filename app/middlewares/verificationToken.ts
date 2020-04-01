import jwt from 'jsonwebtoken';

import {
  signSecrect,
} from '../constant/gloabal';
import {
  STATUS_CODE,
} from '../constant/index';

// 不需要验证的接口
const routesNoVerify: {
  url: string;
  method?: string;
}[] = [
  {
    url: '/api/login',
  },
  {
    url: '/api/user',
    method: 'post',
  },
];

export const verifyToken = async (ctx, next) => {
  let url: string = ctx.request.url;
  let method = ctx.request.method;
  // 是否为不需要验证的接口，通过 url、method
  const isPass = routesNoVerify.some(item => {
    const itemMethod = item.method ? item.method.toUpperCase() : item.method;
    
    return itemMethod ? item.url === url && (itemMethod === method.toUpperCase()) : item.url === url;
  });

  if (isPass) {
    await next();
  } else {
    const token = ctx.request.headers['authorization'];
    
    try {
      let userMsg = jwt.verify(token, signSecrect, {
        complete: true,
      });
      
      ctx.state.userMsg = userMsg;

      await next(userMsg);
    } catch(err) {
      if (err.name === 'TokenExpiredError') {
        ctx.status = STATUS_CODE.loginTimeout;
        ctx.body = '登陆信息已过期，请重新登陆！';
      } else if (err.name === 'JsonWebTokenError') {
        ctx.status = STATUS_CODE.loginTimeout;
        ctx.body = '请登录！';
      }
      console.log(err);
    }
  }
};