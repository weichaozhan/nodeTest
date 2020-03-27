import React from 'react';
import { Button, Form, message, } from 'antd';

import styles from './Index.module.scss';

import UserForm from '../../components/form/UserForm';

import { CODE_REQUEST, } from '../../constants/http';
import {
  registeredUserAPI,
} from '../../api/user';
import { IUser, } from '../../typings/user';
import { http, } from '../../typings/http';

const layout = {
  labelCol: { span: 0, },
  wrapperCol: { span: 24, },
};

const Login = () => {
  const [form] = Form.useForm();

  const submitForm = () => {
    form
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

  return <div className={styles['login-wrapper']} >
    <div className={styles['login-content']} >
      <h1>CMS 系统</h1>

      <UserForm form={form} >
        <Form.Item {...layout}>
          <Button className={styles['submit-btn']} type="primary" size="large" htmlType="submit" onClick={submitForm} >
            注册
          </Button>
        </Form.Item>
      </UserForm>
    </div>
  </div>
}

export default Login;
