import React, { useState } from 'react';
import { withRouter, RouteComponentProps, } from 'react-router-dom';
import { Button, Form, message, Input, } from 'antd';

import styles from './Index.module.scss';
import logo from '../../assets/images/logo.png';

import UserForm from '../../components/form/UserForm';

import { CODE_REQUEST, } from '../../constants/http';
import {
  registeredUserAPI,
  loginAPI,
} from '../../api/user';
import { IUser, } from '../../typings/user';
import { http, } from '../../typings/http';

const FormItem = Form.Item;
const layout = {
  labelCol: { span: 0, },
  wrapperCol: { span: 24, },
};

const Login = (props: RouteComponentProps) => {
  const [formRegister] = Form.useForm();

  const [isLogin, setIsLogin] = useState(true);

  const submitFormRegister = () => {
    formRegister
      .validateFields()
      .then(values => {
        registeredUserAPI(values as IUser)
          .then((res: any) => {
            const result = res as http.IResponse;

            if (result.code === CODE_REQUEST.success) {
              message.success(result.msg);
            } else {
              message.error(result.msg);
            }
          });
      });
  }

  const submitLogin = (values: {
    account: string;
    password: string;
  }) => {
    loginAPI(values)
      .then((res: any) => {
        const result = res as http.IResponse;

        if (result.code === CODE_REQUEST.success) {
          message.success(result.msg);
          localStorage.setItem('token', result.data.token);
          localStorage.setItem('userMsg', JSON.stringify(result.data.user));
          props.history.push('/');
        } else {
          message.error(result.msg);
        }
      });
  }

  return <div className={styles['login-wrapper']} >
    <div className={styles['login-content']} >
      <div className={styles['switch-action']} data-content={isLogin ? '注册' : '登陆'} onClick={() => {
        setIsLogin(!isLogin);
      }} >
      </div>

      <h1 className={styles['title']} >
        <img src={logo} alt="logo" width="50" />
      </h1>

      {isLogin ? <Form
        {...layout}
        labelAlign="left"
        name="login"
        onFinish={(values: any) => {
          submitLogin(values);
        }}
      >
        <FormItem
          name="account"
          rules={[{ required: true, message: '请输入账号！' }]}
          
        >
          <Input size="large" placeholder="请输入账号" />
        </FormItem>
        
        <FormItem
          name="password"
          rules={[{ required: true, message: '请输入密码！' }]}
        >
          <Input.Password size="large" placeholder="请输入密码" />
        </FormItem>

        <FormItem>
          <Button className={styles['submit-btn']} type="primary" size="large" htmlType="submit" >
            登陆
          </Button>
        </FormItem>
      </Form> : <UserForm form={formRegister} >
        <FormItem {...layout}>
          <Button className={styles['submit-btn']} type="primary" size="large" htmlType="submit" onClick={submitFormRegister} >
            注册
          </Button>
        </FormItem>
      </UserForm>}
    </div>
  </div>
}

export default withRouter(Login);
