import React from 'react';
import { connect, } from 'react-redux';
import 'antd/dist/antd.css';

import './styles/index.modules.scss';
import './App.css';

// import TestMobx from './components/test/TestMobx';
import Test from './components/test/Test';
// import TestDB from './components/test/TestDB';

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
const App: React.FC = (props: TProps) => {  
  return (
    <div className="App">      
      {/* <TestDB/>

      <button onClick={() => props.doTestTimeout('react-redux')} >react-redux</button> */}
      <Test/>
      {/* <header className="App-header">
        <h1>
          {props.test.subData}
        </h1>
      </header>

      <TestMobx store={store} /> */}
    </div>
  );
}

export default connect<ReturnType<typeof mapStateToProps>, IDispatch, IOwnProps>(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(App);
