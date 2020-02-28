import React from 'react';
import { connect, } from 'react-redux';
import 'antd/dist/antd.css';

import './styles/index.modules.scss';
import './App.css';

// import TestMobx from './components/test/TestMobx';
import Test from './components/test/Test';
// import TestDB from './components/test/TestDB';
// import MsgFlow from './components/test/MsgFlow';

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
      {/* <MsgFlow items={[
        {
          type: 0,
          content: '1123',
          headSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581604615565&di=9ce5cc422b2cd48bc318fe9a3aaba9af&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F00%2F67%2F59%2F63%2F58e8ebdd5c471.png',
        },
        {
          type: 1,
          content: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=170925426,886086780&fm=26&gp=0.jpg',
          itemAlign: 'right',
        },
        {
          type: 2,
          content: '对方撤回了消息',
        },
        {
          type: 3,
          content: <span>ceshi</span>
        },
        {
          type: 4,
          content: <span>ceshi</span>,
          itemAlign: 'right',
        },
      ]} /> */}

      {/* <TestDB/> */}

      {/* <button onClick={() => props.doTestTimeout('react-redux')} >react-redux</button> */}
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
