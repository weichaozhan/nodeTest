import {
  TEST_DO,
} from '../actions/test';

const initialState = {
  data: 'Initail Data',
  subData: 'test init',
};

const testReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case TEST_DO:
      return {
        ...state,
        subData: action.text,
      };

    default:
      return state;
  }
};

export default testReducer;