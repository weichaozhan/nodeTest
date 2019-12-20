export const TEST_DO = 'TEST_DO';

export const dotest = (text: string) => {
  console.log(text);
  return {
    type: TEST_DO,
    text,
  };
};

export const doTestTimeout = (text: string) => {
  return (dispatch: any, getState: any) => {
    console.log('getState()', getState());
    setTimeout(() => {
      dispatch(dotest(text));
    }, 3000);
  }
}