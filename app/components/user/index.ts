import UserModel from './schema';
import {
  STATUS_CODE,
  InitReaponse,
} from '../../constant';
import {
  validRequired,
} from '../../tools';

export const saveUser = async (ctx, next) => {
  const dataReq = ctx.request.body;
  const newUser = new UserModel(dataReq);
  let bodyRes: IAPIResponse = new InitReaponse();
  let usersGet: any[] = [];

  const valid = validRequired(dataReq, ['name', 'password', 'email',]);

  if (valid) { // 输入不符
    bodyRes = {
      code: 0,
      msg: valid as string,
    };
  } else {
    try {
      const condition = []; // 查询条件：邮箱、用户名
  
      ['email'].forEach(item => {
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
        msg: '邮箱已注册！',  
      };
    }
  }

  ctx.body = bodyRes;
  next();
};

export const removeUser = async (ctx, next) => {
  const dataReq = ctx.request.body;

  let bodyRes: IAPIResponse = new InitReaponse();

  try {
    const statusSave = await UserModel.remove({
      _id: dataReq._id,
    }).exec();

    bodyRes = {
      code: statusSave ? STATUS_CODE.success : STATUS_CODE.undownErr,
      msg: statusSave ? '删除成功！' : '删除失败，请重试！',
    };

  } catch(err) {
    console.log(err);
  }

  ctx.body = bodyRes;
  next();
};

export const updateUser = async (ctx, next) => {
  const dataReq = ctx.request.body;
  let bodyRes: IAPIResponse = new InitReaponse();
  
  let emailUsed = false;
  try {
    const userInEmail = await UserModel.find({
      email: dataReq.email,
    }).exec();
    
    emailUsed = userInEmail.length > 0 ? !userInEmail[0]._id.equals(dataReq._id) : false;
  } catch(err) {
    console.log(err);
  }

  if (!emailUsed) {
    try {
      const statusUpdate = await UserModel.findByIdAndUpdate(dataReq._id, {
        ...dataReq,
      }).exec();
      
      if (statusUpdate) {
        bodyRes = {
          code: STATUS_CODE.success,
          msg: '更新用户成功！',
        };
      } else {
        bodyRes = {
          code: STATUS_CODE.undownErr,
          data: statusUpdate,
          msg: '更新用户失败！',
        };
      }
    } catch(err) {
      bodyRes = {
        code: STATUS_CODE.serverErr,
        msg: err,
      };
    }
  } else {
    bodyRes = {
      code: STATUS_CODE.undownErr,
      msg: '邮箱已被占用，请重新输入！',
    };
  }

  ctx.body = bodyRes;
  next();
};

export const getUsersList = async (ctx, next) => {
  let bodyRes: IAPIResponse = new InitReaponse();

  try {
    const usersList = await UserModel.find().exec();

    bodyRes = {
      code: STATUS_CODE.success,
      msg: '获取用户成功！',
      data: usersList,  
    };
  } catch(err) {
    console.log(err);
  }

  ctx.body = bodyRes;
  next();
};
