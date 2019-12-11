import UserModel from './schema';
import {
  STATUS_CODE,
} from '../../constant';
import {
  validRequired,
} from '../../tools';

export const saveUser = async (ctx, next) => {
  const dataReq = ctx.request.body;
  const newUser = new UserModel(dataReq);
  let bodyRes: IAPIResponse = {
    code: STATUS_CODE.serverErr,
    msg: '服务器错误！',
  };
  let usersGet: any[] = [];

  const valid = validRequired(dataReq, ['name', 'password', 'email', 'auth']);

  if (valid) {
    bodyRes = {
      code: 0,
      msg: valid as string,
    };
  } else {
    try {
      const condition = [];
  
      ['name', 'email'].forEach(item => {
        if (dataReq[item]) {
          condition.push({[item]: dataReq[item]});
        }
      });
      usersGet = await UserModel.find({
        '$or': condition,
      }).exec();
    } catch(err) {
      console.log(err);
    }
    
    if (usersGet.length === 0) {
      try {
        const statusSave = await newUser.save();
    
        if (statusSave) {
          bodyRes = {
            code: STATUS_CODE.success,
            msg: '添加用户成功！',  
          };
        } else {
          bodyRes = {
            code: STATUS_CODE.undownErr,
            msg: '添加用户失败！',  
          };
        }
      } catch(err) {
        console.log(err);
      }
    } else {
      bodyRes = {
        code: STATUS_CODE.undownErr,
        msg: '用户名已存在或邮箱已注册！',  
      };
    }
  }

  ctx.body = bodyRes;
  next();
};
