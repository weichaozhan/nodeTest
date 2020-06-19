import { UserModel, } from '../models/index';
import { ADMIN_ROLE_CODE, } from '../constant/index';

export const forbidOperateAdminUser = async (id: string, callback: (...rest) => any = () => {}, errCallback: (...rest) => any = () => {}) => {
  try {
    const userMsg: any = await UserModel.findById(id).exec();

    if (userMsg?.account === ADMIN_ROLE_CODE) {
      errCallback('forbidden action: account is admin!');
    } else if (userMsg?.account !== ADMIN_ROLE_CODE) {
      callback();
    } else if (!userMsg) {
      errCallback('用户不存在！');
    }
  } catch (err) {
    console.log(err.toString());
    errCallback(err.toString());
  }
}
