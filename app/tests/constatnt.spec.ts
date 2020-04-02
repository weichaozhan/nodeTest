import {
  InitReaponse,
  STATUS_CODE,
} from '../constant/index';

test('Use \'InitReaponse\' to new an object', () => {
  expect(new InitReaponse(0, 'it\' a test', 'I\'m data')).toEqual({
    code: 0,
    msg: 'it\' a test',
    data: 'I\'m data',
  });
  expect(new InitReaponse(0, 'it\' a test')).toEqual({
    code: 0,
    msg: 'it\' a test',
  });
  expect(new InitReaponse()).toEqual({
    code: STATUS_CODE.serverErr,
    msg: '服务器错误！',
  });
});
