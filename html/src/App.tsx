import React from 'react';
import { connect, } from 'react-redux';
import {
  Router,
  Switch,
  Route,
} from 'react-router-dom';
import 'antd/dist/antd.css';

import './styles/index.modules.scss';
import './App.css';

import history from './router/history';

import Login from './pages/login/Index';
import Home from './pages/Home';

// import store from './mobx/test';
import * as test from './store/actions/test';

interface IDispatch {
  doTestTimeout: Function;
}
interface IOwnProps {
  a?: string;
}

/**
 * @description action 作为 props 绑定
 * @param {Dispatch} dispatch dispatch
 */
const mapDispatchToProps = (dispatch: any,): IDispatch => {
  return {
    doTestTimeout: (str: string) => {
      dispatch(test.doTestTimeout(str));
    },
  };
};

/**
 * @description 绑定 store 到props
 * @param {Object} state store
 */
const mapStateToProps = (state: any,) => {
  return {
    ...state,
  };
};

type TProps = IOwnProps & ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>;
const App: React.FC = () => {  
  return (
    <div className="App">
      <Router history={history} >
        <Switch>
          <Route path="/login" exact >
            <Login />
          </Route>

          <Route path="/" >
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default connect<ReturnType<typeof mapStateToProps>, IDispatch, IOwnProps>(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(App);
