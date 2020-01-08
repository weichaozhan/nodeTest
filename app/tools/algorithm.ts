/**
 * @description algorithm
 */

/**
 * @description interface order algorithm
 */
type TSortDir = 'desc' | 'asc';
interface IOrderParam {
  array: any[];
  keySort?: string | null | undefined;
  orderDir?: TSortDir;
}

 /**
 * @description bubble sort
 * @param array 要排序的数组
 * @param keySort 用于排序的字段
 * @param orderDir 升序 'asc'，降序 'desc'
 */
export const bubbleSort = ({ array, keySort = undefined, orderDir = 'asc' }: IOrderParam) => {
  const arraySort: any[] = [...array];

  for (let i = 0; i < arraySort.length; i++) {
    for (let j = 0; j < arraySort.length - i - 1; j++) {
      const keySortExits = ![undefined, null].includes(keySort);
      let preValue = keySortExits ? arraySort[j][keySort] : arraySort[j];
      let nextValue = keySortExits ? arraySort[j + 1][keySort] : arraySort[j + 1];
      const condition = {
        desc: preValue < nextValue,
        asc: preValue > nextValue,
      };

      if (condition[orderDir]) {
        let aux = arraySort[j];
        arraySort[j] = arraySort[j + 1];
        arraySort[j + 1] = aux;
      }
    }
  }

  return arraySort;
};

 /**
 * @description select sort
 * @param array 要排序的数组
 * @param keySort 用于排序的字段
 * @param orderDir 升序 'asc'，降序 'desc'
 */
export const selectSort = ({ array, keySort = undefined, orderDir = 'asc' }: IOrderParam) => {
  const arraySort = [...array];
  const keySortExits = ![undefined, null].includes(keySort);
  
  for (let i = 0; i < arraySort.length; i++) {
    let mostValueIndex = i;
    let mostValue = keySortExits ? arraySort[i][keySort] : arraySort[i];

    for (let j = i + 1; j < arraySort.length; j++) {
      const positionValue = keySortExits ? arraySort[j][keySort] : arraySort[j];
      const condition = {
        desc: mostValue < positionValue,
        asc: mostValue > positionValue,
      };
      
      if (condition[orderDir]) {
        mostValueIndex = j;
        mostValue = positionValue;
      }
    }

    if (mostValueIndex !== i) {
      const aux = arraySort[mostValueIndex];
      arraySort[mostValueIndex] = arraySort[i];
      arraySort[i] = aux;
    }
  }

  return arraySort;
};

/**
 * @description insert sort
 * @param array 要排序的数组
 * @param keySort 用于排序的字段
 * @param orderDir 升序 'asc'，降序 'desc'
 */
export const insertSort = ({ array, keySort = undefined, orderDir = 'asc' }: IOrderParam) => {
  const arraySort = [...array];

  for (let i = 0; i < arraySort.length - 1; i++) {
    const keySortExits = ![undefined, null].includes(keySort);
    
    for (let j = i + 1; j > 0; j--) {
      let current = keySortExits ? arraySort[j][keySort] : arraySort[j];
      let nextValue = keySortExits ? arraySort[j - 1][keySort] : arraySort[j - 1];
      const condition = {
        desc: current > nextValue,
        asc: current < nextValue,
      };

      if (condition[orderDir]) {
        const aux = arraySort[j];
        arraySort[j] = arraySort[j - 1];
        arraySort[j - 1] = aux;
      }
    }
  }

  return arraySort;
};

const dir: TSortDir = 'desc';

console.log(dir, insertSort({
  // array: [1,22,31,664,85,86,17,98,89],
  array: [5,8,5,2,22,1,22,1,31,1, 31,664,86,17,98,89, 1, 89,1, 89, 20, 22, 22, 31, 31].map((item, index) => ({
    keyValue: item,
    name: index,
  })),
  keySort: 'keyValue',
  orderDir: dir,
}));
