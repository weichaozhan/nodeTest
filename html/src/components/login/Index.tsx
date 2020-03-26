import React, { useState, useEffect, } from 'react';
import { Button, Input, Form, message, Table, } from 'antd';

import styles from './Index.module.scss';

import { CODE_REQUEST, } from '../../constants/http';
import {
  getUsersAPI,
  registeredUserAPI,
} from '../../api/user';
import { IUser } from '../../typings/user';
import { http } from '../../typings/http';

const FormItem = Form.Item;
const { Column, } = Table;

const layout = {
  labelCol: { span: 0, },
  wrapperCol: { span: 24, },
};

const Login = () => {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    getUsersAPI()
      .then((res: any) => {
        if (res.code === CODE_REQUEST.success) {
          const result = res as http.IResponse;

          setUsers(result.data);
        }
      });
  };

  return <div className={styles['login-wrapper']} >
    <div className={styles['login-content']} >
      <Form
        {...layout}
        labelAlign="left"
        name="login"
        onFinish={(values) => {
          registeredUserAPI(values as IUser)
            .then((res: any) => {
              const result = res as http.IResponse;

              if (result.code === CODE_REQUEST.success) {
                message.success(result.msg);
                getUsers();
              } else {
                message.error(result.msg);
              }
            });
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
            注册
          </Button>
        </Form.Item>
      </Form>

      

      <Table
        dataSource={users}
        bordered
        size="small"
      >
        <Column title="姓名" dataIndex="name" ></Column>
        <Column title="邮箱" dataIndex="email" ></Column>
        <Column title="权限" dataIndex="auth" render={(keyValue: number[]) => keyValue.join()} ></Column>
      </Table>
    </div>
  </div>
}

export default Login;
