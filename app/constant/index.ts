export const ADMIN_PASSWORD = '123456';
export const ADMIN_ACCOUNT = 'admin';
export const ADMIN_ROLE_CODE = 'admin';

export const ADMIN_USER = {
  name: 'admin',
  account: ADMIN_ACCOUNT,
  password: ADMIN_PASSWORD,
  email: 'admin',
};
export const ADMIN_ROLE = {
  name: '超级管理员',
  code: ADMIN_ROLE_CODE,
};

export const STATUS_CODE = {
  success: 200,
  serverErr: 502,
  undownErr: 0,
  loginTimeout: 401,
};

export function InitReaponse(code: number = STATUS_CODE.serverErr, msg = '服务器错误！', data?: any) {
  this.code = code;
  this.msg = msg;
  data && (this.data = data);
}

export const ACTION_AUTH = {
  0: {
    name: '添加',
  },
  1: {
    name: '删除',
  },
  2: {
    name: '修改',
  },
  3: {
    name: '查询',
  },
};
