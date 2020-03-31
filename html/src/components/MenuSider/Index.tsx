import React from 'react';
import { NavLink, withRouter, RouteComponentProps, } from 'react-router-dom';
import { Menu, } from 'antd';
import { LoginOutlined, UsergroupAddOutlined, } from '@ant-design/icons';

interface IProps extends RouteComponentProps {
  className?: string;
}

const MenuItem = Menu.Item;

const Sider = (props: IProps) => {
  const { className, } = props;

  return <Menu
    className={className}
    mode="inline"
    theme="dark"
    defaultSelectedKeys={[props.history.location.pathname]}
  >
    <MenuItem key="/login" title="登陆" >
      <NavLink to="/login" >
        <LoginOutlined />
        <span>登陆</span>
      </NavLink>
    </MenuItem>

    <MenuItem key="/users" title="用户管理" >
      <NavLink to="/users" >
        <UsergroupAddOutlined />
        <span>用户管理</span>
      </NavLink>
    </MenuItem>
  </Menu>;
}

export default withRouter(Sider);