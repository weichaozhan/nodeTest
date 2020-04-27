import React, { useEffect } from 'react';
import { Input, Form, } from 'antd';
import {
} from '../../api/user';
import { FormInstance } from 'antd/lib/form';
import { IUser } from '../../typings/user';

interface IProps {
  form: FormInstance;
  action?: 'add' | 'edit'; 
  children?: React.ReactChild;
  initialValues?: IUser;
}

const FormItem = Form.Item;

const layout = {
  labelCol: { span: 6, },
  wrapperCol: { span: 18, },
};

const UserForm = (props: IProps) => {
  const { form, initialValues, children, action, } = props;

  useEffect(() => {
    form.setFieldsValue(initialValues as IUser);
  }, [initialValues, form]);

  return <Form
    form={form}
    {...layout}
    labelAlign="left"
    name="register"
    initialValues={initialValues}
  >
    <FormItem
      name="name"
      label="姓名"
      rules={[{ required: true, message: '请输入姓名！' }]}
      
    >
      <Input size="large" placeholder="请输入姓名" />
    </FormItem>

    <FormItem
      name="account"
      label="账号"
      rules={[{ required: true, message: '请输入账号！' }]}
      
    >
      <Input size="large" placeholder="请输入账号" />
    </FormItem>
    
    {action === 'add' && <FormItem
      name="password"
      label="密码"
      rules={[{ required: true, message: '请输入密码！' }]}
    >
      <Input.Password size="large" placeholder="请输入密码" />
    </FormItem>}

    <FormItem
      name="email"
      label="邮箱"
      rules={[
        { required: true, message: '请输入邮箱！', },
        { message: '请输入输入正确的邮箱格式！', type: 'email', },
      ]}
    >
      <Input size="large" placeholder="请输入邮箱" />
    </FormItem>
    
    {children}
  </Form>
}

UserForm.defaultProps = {
  initialValues: {},
  action: 'add',
};

export default UserForm;
