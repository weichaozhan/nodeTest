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

function Child() {
  const value = useContext(CountContext);
  
  return <div>
    Child: {value.count}
  </div>
}

function Child2() {
  const value = useContext(CountContext);

  return <h2>
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
function Test(props: IProps) {
  const { text, } = props;
  const [btnTxt, setBtnTxt] = useState(1);
  const { state, dispatch, } = usePublicCount();

  useEffect(() => {
    console.log('Test useEffect');
  }, []);

  return <div>
    <button onClick={() => setBtnTxt(Math.random())} >{btnTxt}</button>
    <h1>
      text: {text}
    </h1>

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
