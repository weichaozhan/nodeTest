import React, { useState, lazy, Suspense, } from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { getJsonLocalStorage, } from '../utils/localStorage';
import { Layout, Button, Dropdown, Menu, } from 'antd';
import { AlignCenterOutlined, UserOutlined, } from '@ant-design/icons';

import styles from './home.module.scss';

import MenuSider from '../components/MenuSider/Index';
// import Users from './users/Index';
// import MenuManage from './menuManage/Index';
import { NAMES_LOCALSTORAGE } from '../constants/global';

const Users = lazy(() => import('./users/Index'));
const MenuManage = lazy(() => import('./menuManage/Index'));

const { Sider, Header, Content, } = Layout;
const MenuItem = Menu.Item;

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
        CMS
      </div>
      
      <MenuSider />
    </Sider>
    
    <Layout>
      <Header>
        <Dropdown
          overlay={<Menu>
            <MenuItem>退出</MenuItem>
          </Menu>}
        >
          <div className={styles['user-dropdown']} >
            <UserOutlined />
            {getJsonLocalStorage(NAMES_LOCALSTORAGE.userMsg)?.name}
          </div>
        </Dropdown>
      </Header>

      <Content className={styles['home-content']} >
        <Suspense fallback={<div className={styles['loading-suspense']} >
          <div className={styles['loading-content']} >
            loading...
          </div>
        </div>} >
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

            <Route path="/menuManage" exact >
              <MenuManage/>
            </Route>

          </Switch>
        </Suspense>
      </Content>
    </Layout>
  </Layout>
}

export default Home;