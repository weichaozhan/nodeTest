import React, { useState, useEffect, useReducer, useContext, createContext, } from 'react';

interface IProps {
  text: string;
};
interface IState {
  count: number
}
interface IAction {
  type: 'desc' | 'asc' | 'reset';
  payload?: IState;
}

function OriginChild() {
  const value = useContext(CountContext);
  
  return <div>
    {console.log('render Child')}
    Child: {value.count}
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
  });

  return { state, dispatch, };
}
function Test() {
  const [btnTxt, setBtnTxt] = useState(1);
  const { state, dispatch, } = usePublicCount();

  useEffect(() => {
    console.log('Test useEffect');
  }, []);

  return <div>
    <div>
      <button onClick={() => setBtnTxt(Math.random())} >{btnTxt}</button>
    </div>

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

    <Count countState={state} >
      <Child />
      <Child2 />
    </Count>
  </div> 
}

export default Test;
