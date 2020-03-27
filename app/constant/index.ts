export const STATUS_CODE = {
  success: 200,
  serverErr: 502,
  undownErr: 0,
};

export function InitReaponse() {
  this.code = STATUS_CODE.serverErr;
  this.msg = '服务器错误！';
}
