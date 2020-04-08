import UserModal from '../../models/userModel';
import {
  STATUS_CODE,
  InitReaponse,
} from '../../constant';
import { validRequired, } from '../../tools';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { signSecrect, } from '../../constant/gloabal';

export const login = async (ctx, next) => {
  const dataReq = ctx.request.body;
  let bodyRes: IAPIResponse = new InitReaponse();

  const resultValid = validRequired(dataReq, ['account', 'password']);

  if (resultValid) {
    bodyRes.code = STATUS_CODE.undownErr;
    bodyRes.msg = resultValid as string;
  } else {
    try {
      const userList = await UserModal.find({
        account: dataReq.account,
      }).exec();
      const user: any = userList?.[0];
      
      if (user) {
        const passwordRequire = dataReq.password;
        const passwordGet = user?.password;
      
        const isPass = bcrypt.compareSync(passwordRequire, passwordGet);
        if (isPass) {
          const token = jwt.sign({
            _id: user._id,
            account: user.account,
            name: user.name,
            email: user.email,
          }, signSecrect, { expiresIn: '8h', });
          
          bodyRes.code = STATUS_CODE.success;
          bodyRes.data = {
            token,
            user,
          };
          bodyRes.msg = '登陆成功！';
        } else {
          bodyRes.code = STATUS_CODE.undownErr;
          bodyRes.msg = '密码错误！';
        }
      } else {
        bodyRes.code = STATUS_CODE.undownErr;
        bodyRes.msg = '账号不存在！';
      }
    } catch (err) {
      console.log(err);
    }
  }

  ctx.body = bodyRes;
  next();
};