import { combineReducers, createStore, applyMiddleware, Dispatch, } from 'redux';

import test from './reducers/test';

/**
 * applyMiddleware(...middleware)
 * ...middleware (arguments): 
 * 遵循 Redux middleware API 的函数。
 * 每个 middleware 接受 Store 的 dispatch 和 getState 函数作为命名参数，并返回一个函数。
 * 该函数会被传入被称为 next 的下一个 middleware 的 dispatch 方法，并返回一个接收 action 的新函数，
 * 这个函数可以直接调用 next(action)，或者在其他需要的时刻调用，甚至根本不去调用它。
 * 调用链中最后一个 middleware 会接受真实的 store 的 dispatch 方法作为 next 参数，并借此结束调用链。
 * 所以，middleware 的函数签名是 ({ getState, dispatch }) => next => action。
 */
interface IMiddlewareParams {
  dispatch: Dispatch;
  getState: any;
}

const createThunkMiddleWare: any = (extra: any) => {
  return (middlewarePrams: IMiddlewareParams) => {
    const { dispatch, getState, } = middlewarePrams;

    return (next: any) => (action: any) => {
      if (typeof action === 'function') {
        return action(dispatch, getState, extra);
      }
    
      return next(action);
    };
  }
};

const rootRedeucer = combineReducers({
  test
});

export default createStore(rootRedeucer, applyMiddleware(createThunkMiddleWare()));