import UserModal from '../user/schema';
import {
  STATUS_CODE,
  InitReaponse,
} from '../../constant';
import { validRequired, } from '../../tools';
import bcrypt from 'bcrypt';

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
          bodyRes.code = STATUS_CODE.success;
          bodyRes.msg = '登陆成功！';
        } else {
          bodyRes.code = STATUS_CODE.undownErr;
          bodyRes.msg = '密码错误！';
        }
      } else {
        bodyRes.code = STATUS_CODE.undownErr;
        bodyRes.msg = '账号未注册！';
      }
    } catch (err) {
      console.log(err);
    }
  }

  ctx.body = bodyRes;
  next();
};