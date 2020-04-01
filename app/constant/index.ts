export const STATUS_CODE = {
  success: 200,
  serverErr: 502,
  undownErr: 0,
  loginTimeout: 401,
};

export function InitReaponse(code: number = STATUS_CODE.serverErr, msg: string = '服务器错误！', data?: any) {
  this.code = code;
  this.msg = msg;
  data && (this.data = data);
}
