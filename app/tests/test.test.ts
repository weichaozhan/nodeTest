describe('api 映射模块', () => {
  // 在所有单测运行前执行，用于准备当前 describe 模块所需要的环境准备，比如全局的数据库；
  beforeAll(() => {

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

  it('当 env 为默认的 development 环境时，返回 localhost 地址', async() => {
    process.env.NODE_ENV = 'development';

    // const API = require('lib/api');

    // expect(API).toThrow(); // 期望 API 抛错
    // expect(API('')).toMatch(/localhost/); // 期望返回包含 'localhost' 字段
  });

  it.only('当 env 为测试环境时，返回测试环境地址', async() => { // 仅执行本测试用例，常用于调试当前用例
    process.env.NODE_ENV = 'test';

    // const API = require('lib/api');

    // expect(API('get_items')).toMatch(/test.baidu.info/);
  });
});