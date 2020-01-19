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
      let baseIndex = left;
      const baseValue = keySortExits ? arraySort[baseIndex][keySort] : arraySort[baseIndex];
      let il = left + 1;
      let ir = right;
      
      while (il < ir) {
        const valueLeft = keySortExits ? arraySort[il][keySort] : arraySort[il];
        const valueRight = keySortExits ? arraySort[ir][keySort] : arraySort[ir];
        const condition = {
          asc: {
            exchange: valueLeft >= baseValue && valueRight <= baseValue,
            ilCompare: valueLeft <= baseValue,
            irCompare: valueRight >= baseValue,
          },
          desc: {
            exchange: valueLeft <= baseValue && valueRight >= baseValue,
            ilCompare: valueLeft >= baseValue,
            irCompare: valueRight <= baseValue,
          },
        };
        
        if (condition[orderDir].exchange) {
          const auk = arraySort[il];
          arraySort[il] = arraySort[ir];
          arraySort[ir] = auk;
        }
        
        if (condition[orderDir].ilCompare) {
          il++;
        }
        if (condition[orderDir].irCompare) {
          ir--;
        }
      }

      let transIndex = ir;
      const transValue = keySortExits ? arraySort[transIndex][keySort] : arraySort[transIndex];
      const transCondition = {
        asc: transValue > baseValue,
        desc: transValue < baseValue, 
      };
      if (transCondition[orderDir]) {
        transIndex = ir - 1;
      }
      let trans = arraySort[transIndex];
      arraySort[transIndex] = arraySort[baseIndex];
      arraySort[baseIndex] = trans;
      
      if (transIndex - baseIndex > 1) {
        quick(baseIndex, transIndex);
      }
      if (right - (transIndex + 1) > 1) {
        quick(transIndex + 1, right);
      }
    };

    quick(0, arraySort.length - 1);
  }
  
  return arraySort;
};

interface ISearchResult {
  index: number;
  value: number | string | undefined | null | boolean;
}
interface ISearchArray {
  array: (string | number | undefined)[],
  target: string | number,
  orderDir?: 'asc' | 'desc',
}
/**
 * @description 线性查找
 * @param array 要排序的数组
 * @param target 要查找的值
 */
export const searchSNArrayLinear = ({ array, target, }: ISearchArray): ISearchResult | undefined => {
  let result: ISearchResult | undefined;
  
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
      result = {
        index: i,
        value: array[i],
      };
      break;
    }
  }
  return result;
};

/**
 * @description 二分查找(无序)
 * @param array 要排序的数组
 * @param target 要查找的值
 */
export const searchSNArrayBinaryRandom = ({ array, target, }: ISearchArray): ISearchResult | undefined => {
  let result: ISearchResult | undefined;

  const searchBinary = (start: number, end: number) => {
    const mid = Math.ceil((start + end) / 2);

    for (let i = mid; i < (end + 1); i++) {
      if (array[i] === target) {
        result = {
          index: i,
          value: array[i],
        };
        break;
      }
    }
    
    if (!result && (mid - 1 - start) > 0) {
      searchBinary(start, mid - 1);
    }
  };

  searchBinary(0, array.length - 1);
  return result;
};

/**
 * @description 二分查找(有序)
 * @param array 要排序的数组
 * @param target 要查找的值
 */
export const searchSNArrayBinaryOrderly = ({ array, target, orderDir = 'asc', }: Required<ISearchArray>): ISearchResult | undefined => {
  let result: ISearchResult | undefined;

  const searchBinary = (start: number, end: number) => {
    const mid = Math.ceil((start + end) / 2);
    const midValue = array[mid];

    if (midValue === target) {
      result = {
        index: mid,
        value: midValue,
      };
    }
    
    if (!result) {
      const condition = {
        asc: midValue < target,
        desc: midValue > target,
      };
      
      if (condition[orderDir]) {
        searchBinary(mid, end);
      } else {
        searchBinary(start, mid - 1);
      }
    }
  };

  searchBinary(0, array.length - 1);
  return result;
};

export const findFibonacci = (num: number): number => {
  let fibonacci = 1;
  
  if (num !== 1 && num !== 2) {
    let f0 = 1;
    let f1 = 1;
    
    for (let i = 2; i < num; i++) {
      fibonacci = f0 + f1;

      f0 = f1;
      f1 = fibonacci;
    }
  }

  return fibonacci;
};

/**
 * @description 快速幂
 * @param a 底数
 * @param b 指数
 */
const pow = (a: number, b: number) => {
  let na = a;
  let nb = b;
  let res = 1;

  while (nb > 0) {
    if (nb & 1) {
      res = res * na;
    }
    na *= na;
    nb >>= 1;
  }

  return res;
};

/**
 * @description 二分幂
 * @param a 底数
 * @param b 指数
 */
const powBinary = (a: number, b: number): number => {
  let ans: number;

  if (b === 0) {
    ans = 1;
  } else if (b === 1) {
    ans = a;
  } else {
    let nb = b % 2 ? b - 1 : b;

    ans = powBinary(a, nb/2);
    ans *= ans;
    if (b % 2) {
      ans *= a;
    }
  }
  return ans;
};
