import {
  UserModel,
  RoleModel,
} from '../models/index';
import {
  ADMIN_ACCOUNT,
  ADMIN_ROLE_CODE,

  ADMIN_USER,
  ADMIN_ROLE,
} from '../constant/index';

// import userModel from '../models/userModel';

export const createAdminUser = async () => {
  const users = await UserModel.find({
    account: ADMIN_ACCOUNT,
  }).exec();
  
  if (users.length === 0) {
    const role = await RoleModel.find({
      code: ADMIN_ROLE_CODE,
    }).exec();
    
    const adminUser = new UserModel({
      ...ADMIN_USER,
      role,
    });

    try {
      await adminUser.save();
    } catch (err) {
      console.log(err);
    }
  }
};

export const createAdminRole = async () => {
  const roles = await RoleModel.find({
    code: ADMIN_ROLE_CODE,
  }).exec();

  if (roles.length === 0) {
    const adminRole = new RoleModel({
      ...ADMIN_ROLE,
    });

    try {
      await adminRole.save();
    } catch (err) {
      console.log(err);
    }
  }
};

export const initMongoData = async () => {
  createAdminRole()
    .then(res => {

      
      createAdminUser();
    });
  
};
