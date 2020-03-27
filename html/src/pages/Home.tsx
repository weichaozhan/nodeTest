import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import styles from './home.module.scss'

import Users from './users/Index';

const Home = () => {
  return <div className={styles['wrapper']} >
    <div className={styles['menu-wrapper']} >
      menu
    </div>
    <div className={styles['content']} >
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
    </div>
  </div>
}

export default Home;