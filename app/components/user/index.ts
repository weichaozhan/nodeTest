import UserModel from './schema';
import {
  STATUS_CODE,
  InitReaponse,
} from '../../constant';
import mongoose from 'mongoose';

export const saveUser = async (ctx, next) => {
  const dataReq = ctx.request.body;
  const newUser = new UserModel(dataReq);
  let bodyRes: IAPIResponse = new InitReaponse();

  const error = newUser.validateSync();
  
  if (error) {
    bodyRes = {
      code: STATUS_CODE.undownErr,
      msg: error?.message,
    };
  } else {
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
      if (err.message.indexOf('duplicate key error') > -1) {
        if (err.message.indexOf('email') > -1) {
          bodyRes.msg = '邮箱已占用！';
        } else if (err.message.indexOf('account') > -1) {
          bodyRes.msg = '账户已占用！';
        }
      } else {
        console.log(err);
      }
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
    const usersList = await UserModel.find(null, '_id name auth email account').exec();

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
