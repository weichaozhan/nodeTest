import React from 'react';
import { Button, Input, Form, } from 'antd';

import styles from './Index.module.scss';

const FormItem = Form.Item;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = () => {

  return <div className={styles['login-wrapper']} >
    <div className={styles['login-content']} >
      {/* <Form
        {...layout}
        name="login"
        onFinish={(values) => {
          console.log('values', values);
        }}
      >
        <FormItem
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </FormItem>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form> */}
    </div>
  </div>
}

export default Login;
