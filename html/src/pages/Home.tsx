import React, { useState, } from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Layout, Button, } from 'antd';
import { AlignCenterOutlined, } from '@ant-design/icons';

import styles from './home.module.scss';

import MenuSider from '../components/MenuSider/Index';
import Users from './users/Index';

const { Sider, Header, Content, } = Layout;

const Home = () => {
  const [collapsed, setCollapsed] = useState(localStorage.getItem('collapsed') === 'true');

  const changeCollapsed = () => {
    localStorage.setItem('collapsed', `${!collapsed}`);
    setCollapsed(!collapsed);
  };

  return <Layout className={styles['home-wrapper']} >

    <Sider className={styles['home-sider']} collapsed={collapsed} >
      <Button className={styles['collapsed-controllor']} icon={<AlignCenterOutlined />} onClick={changeCollapsed} ></Button>

      <div className={styles['system-title']} >
        {collapsed ? 'CMS' : 'CMS 系统'}
      </div>
      
      <MenuSider />
    </Sider>
    
    <Layout>
      <Header>
        header
      </Header>

      <Content className={styles['home-content']} >
        <Switch>
          <Route path="/" exact render={() => <Redirect
            to={{
              pathname: "/users",
              state: { from: '/', },
            }}
          />} >
          </Route>

          <Route path="/users" exact >
            <Users/>
          </Route>

        </Switch>
      </Content>
    </Layout>
  </Layout>
}

export default Home;