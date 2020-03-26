import React from 'react';
import { Button, Input, Form, } from 'antd';

import styles from './Index.module.scss';

const FormItem = Form.Item;

const layout = {
  labelCol: { span: 0, },
  wrapperCol: { span: 24, },
};

const Login = () => {

  return <div className={styles['login-wrapper']} >
    <div className={styles['login-content']} >
      <Form
        {...layout}
        labelAlign="left"
        name="login"
        onFinish={(values) => {
          console.log('values', values);
        }}
      >
        <FormItem
          name="name"
          rules={[{ required: true, message: '请输入姓名！' }]}
        >
          <Input size="large" placeholder="请输入姓名" />
        </FormItem>
        
        <FormItem
          name="password"
          rules={[{ required: true, message: '请输入密码！' }]}
        >
          <Input.Password size="large" placeholder="请输入密码" />
        </FormItem>

        <FormItem
          name="email"
          rules={[
            { required: true, message: '请输入邮箱！', },
            { message: '请输入输入正确的邮箱格式！', type: 'email', },
          ]}
        >
          <Input size="large" placeholder="请输入邮箱" />
        </FormItem>

        <Form.Item {...layout}>
          <Button className={styles['submit-btn']} type="primary" size="large" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  </div>
}

export default Login;
