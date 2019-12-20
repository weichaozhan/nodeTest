import React from 'react';
import { Dispatch, } from 'redux';
import { connect, } from 'react-redux';
import './App.css';
import * as test from './store/actions/test';

interface IDispatch {
  dotest: Function;
}
interface IOwnProps {
  a?: string;
}

/**
 * @description action 作为 props 绑定
 * @param {Dispatch} dispatch dispatch
 */
const mapDispatchToProps = (dispatch: Dispatch,): IDispatch => {
  return {
    dotest: (str: string) => test.dotest(str),
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
  props.dotest('react-redux');
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          {props.test.subData}
        </h1>
      </header>
    </div>
  );
}

export default connect<ReturnType<typeof mapStateToProps>, IDispatch, IOwnProps>(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(App);
