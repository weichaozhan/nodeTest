import { NAMES_LOCALSTORAGE, } from '../constants/global';

export const getJsonLocalStorage = (name: NAMES_LOCALSTORAGE) => {
  const lsValue = localStorage.getItem(name);
  return lsValue ? JSON.parse(lsValue) : null;
}
