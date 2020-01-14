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

/**
 * @description merge sort
 * @param array 要排序的数组
 * @param keySort 用于排序的字段
 * @param orderDir 升序 'asc'，降序 'desc'
 */
export const mergeSort = ({ array, keySort = undefined, orderDir = 'asc' }: IOrderParam): any[] => {
  const arraySort = [...array];
  const keySortExits = ![undefined, null].includes(keySort);
  
  const merge = (left: any[], right: any[]) => {
    const result: any[] = [];
    let indexLeft = 0;
    let indexRight = 0;
    
    while (indexLeft < left.length && indexRight < right.length) {
      const valueLeft = keySortExits ? left[indexLeft][keySort] : left[indexLeft];
      const valueRight = keySortExits ? right[indexRight][keySort] : right[indexRight];
      const condition = {
        asc: valueLeft <= valueRight,
        desc: valueLeft >= valueRight
      };
      
      if (condition[orderDir]) {
        result.push(left[indexLeft++]);
      } else {
        result.push(right[indexRight++]);
      }
    }
    
    while (indexLeft < left.length) {
      result.push(left[indexLeft++]);
    }
    while (indexRight < right.length) {
      result.push(right[indexRight++]);
    }
    
    return result;
  };
  const splitArray = (arraySplit: any[]) => {
    if (arraySplit.length > 1) {
      const mid = Math.floor(arraySplit.length/2);
      const left = arraySplit.slice(0, mid);
      const right = arraySplit.slice(mid);
      
      return merge(splitArray(left), splitArray(right));
    } else {
      return arraySplit;
    }
  };
  

  return splitArray(arraySort);
};

/**
 * @description quickly sort
 * @param array 要排序的数组
 * @param keySort 用于排序的字段
 * @param orderDir 升序 'asc'，降序 'desc'
 */
export const quickSort = ({ array, keySort = undefined, orderDir = 'asc' }: IOrderParam): any => {
  const arraySort = [...array];
  const keySortExits = ![undefined, null].includes(keySort);

  if (arraySort.length > 1) {
    const quick = (left: number, right: number) => {
      let midIndex = Math.ceil((left + right)/2);
      const midItem = keySortExits ? arraySort[midIndex][keySort] : arraySort[midIndex];
      let il = left;
      let ir = right;
      
      while (il < ir) {
        const valueLeft = keySortExits ? arraySort[il][keySort] : arraySort[il];
        const valueRight = keySortExits ? arraySort[ir][keySort] : arraySort[ir];
        const condition = {
          asc: {
            exchange: valueLeft >= midItem && valueRight <= midItem,
            ilCompare: valueLeft <= midItem,
            irCompare: valueRight >= midItem,
          },
          desc: {
            exchange: valueLeft <= midItem && valueRight >= midItem,
            ilCompare: valueLeft >= midItem,
            irCompare: valueRight <= midItem,
          },
        };
        
        if (condition[orderDir].exchange) {
          const auk = arraySort[il];
          arraySort[il] = arraySort[ir];
          arraySort[ir] = auk;

          if (il === midIndex) {
            midIndex = ir;
            ir = midIndex + 1;
          }
          if (ir === midIndex) {
            midIndex = il;
            il = midIndex - 1;
          }
        }
        
        if (condition[orderDir].ilCompare) {
          il++;
        }
        if (condition[orderDir].irCompare) {
          ir--;
        }
      }
      if (right - left > 1) {
        quick(left, midIndex);
        quick(midIndex, right);
      }
    };

    quick(0, arraySort.length - 1);
  }
  return arraySort;
};

const dir: TSortDir = 'desc';
// const array = [5,8,5,2,22,1,22,1,31,1, 31,664,86,17,98,89, 1, 89,1, 89, 20, 22, 22, 31, 31];
const array = [5,8,5,2,22,1,22,1,31,1, 31,664,86,17,98,89, 1, 89,1, 89, 20, 22, 22, 31, 31].map((item, index) => ({
  keyValue: item,
  name: index,
}));

console.log(dir, quickSort({
  array,
  keySort: 'keyValue',
  orderDir: dir,
}));
