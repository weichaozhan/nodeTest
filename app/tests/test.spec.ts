// https://quanru.github.io/2018/02/22/%E4%BD%BF%E7%94%A8%20Jest%20%E6%B5%8B%E8%AF%95%20Node.js/
import supertest from 'supertest';

import {
  STATUS_CODE,
} from '../constant';
import app from '../app';

describe('api 映射模块', () => {
  let server;
  let request;
  let token: string;

  // 在所有单测运行前执行，用于准备当前 describe 模块所需要的环境准备，比如全局的数据库；
  beforeAll(async (done) => {
    server = app.callback();
    request = supertest.agent(server);

    const res = await request
      .post('/api/login')
      .send({
        account: 'admin',
        password: '123456',
      });
    
    token = res.body.data.token;

    done();
  });
  
  // 在每个单测运行前执行，用于准备每个用例（it）所需要的操作，比如重置 server app 操作
  beforeEach(() => {
  });

  // 在每个单测运行后执行，用于清理每个用例（it）的相关变量，比如重置所有模块的缓存
  afterEach(() => {
    jest.resetModules();
  });

  // 在所有单测运行后执行，用于清理环境，比如清理一些为了单测而生成的“环境准备”
  afterAll(() => {
  });

  // 注：以上四个方法均支持返回一个 Promise，此时 Jest 将等待该 Promise resolve 后继续

  describe('User actions', () => {
    it('Get users', async (done) => {
      const res = await request
        .get('/api/user')
        .set('Authorization', token)
        .send({
          token,
        });
      
      expect(res.status).toBe(STATUS_CODE.success);
      done();
    });
  });

  describe('Login actions', () => {
    it('login', async (done) => {
      const res = await request
        .post('/api/login')
        .send({
          account: 'admin',
          password: '12345',
        });

      expect(res.body.code).toBe(STATUS_CODE.undownErr);
      expect(res.body.msg).toBe('密码错误！');
      
      done();
    });
  });
});