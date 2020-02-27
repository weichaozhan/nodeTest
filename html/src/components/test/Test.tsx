import React, { useState, useEffect, useReducer, useContext, createContext, useMemo, useCallback, } from 'react';

interface IState {
  count: number
}
interface IAction {
  type: 'desc' | 'asc' | 'reset';
  payload?: IState;
}


interface IOriginChildProps {
  datause: any;
  onChange?: Function;
}
function OriginChild(props: IOriginChildProps) {
  const value = useContext(CountContext);
  
  return <div>
    {console.log('render Child')}
    Child: {value.count}

    <div>
      datause: {props.datause.name}
    </div>
  </div>
}
const Child = React.memo(OriginChild);

function Child2() {
  const value = useContext(CountContext);

  return <h2>
    {console.log('render Child2')}
    Child2: {value.count}
  </h2>;
}


const initialState = {
  count: 0,
};
const CountContext = createContext({ ...initialState, });
function Count(props: any) {
  return <CountContext.Provider value={props.countState} >
    {props.children}
  </CountContext.Provider>
}

/**
 * Test reducer
 * @param initailState 
 */
const initState = (initailState: IState) => {
  return { ...initailState, };
}
const reducer = (state: IState, action: IAction): IState => {
  let newState: IState = { ...state, };

  switch(action.type) {
    case 'desc':
      newState.count--;
      break;
    case 'asc':
      newState.count++;
      break;
    case 'reset':
      newState = initState(action.payload as IState);
      break;
    default:
      break;
  }

  return newState;
};
function usePublicCount() {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
  }, initState);

  return { state, dispatch, };
}

/**
 * 自定义 hooks
 */
function useCustomData(count: number) {
  const [newCount, setNewCount] = useState(count);

  useEffect(() => {
    console.log('newCount', newCount);
  });

  return [newCount, setNewCount] as [number, Function];
}

function Test() {
  const [btnTxt, setBtnTxt] = useState(1);
  const { state, dispatch, } = usePublicCount();
  const [newCount, setNewCount] = useCustomData(state.count);

  useEffect(() => {
    console.log('Test useEffect');
  }, []);

  let testUseMemo = useMemo(() => {
    return {
      name: 'testUseMemo',
    };
  }, []);

  const changeFuncChild = useCallback(() => {
    console.log('changeFuncChild');
  }, []);

  return <div>
    <h1>
      {newCount}

      <button onClick={() => {
        setNewCount(state.count + 1);
      }} >set newCount</button>
    </h1>

    <div>
      <button onClick={() => {
        setBtnTxt(Math.random());
      }} >{btnTxt}</button>
    </div>
    
    <div style={{ margin: '20px', }} >
      <button onClick={() => dispatch({
        type: 'asc'
      })} >count up</button>
      <button onClick={() => dispatch({
        type: 'desc'
      })} >count down</button>
      <button onClick={() => dispatch({
        type: 'reset',
        payload: {
          count: 10,
        },
      })} >count rest</button>
    </div>
    
    <Count countState={state} >
      <Child datause={testUseMemo} onChange={changeFuncChild} />
      <Child2 />
    </Count>
  </div> 
}

export default Test;
