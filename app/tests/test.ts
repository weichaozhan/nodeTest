export const sortSelect = (list: number[]) => {
  for (let i = 0; i < list.length; i++) {
    let indexMin = i;

    for (let j = i + 1; j < list.length; j++) {
      if (list[indexMin] > list[j]) {
        indexMin = j;
      }
    }

    const cache = list[indexMin];

    list[indexMin] = list[i];
    list[i] = cache;
  }
};

export const sortInsert = (list: number[]) => {
  for (let i = 0; i < list.length; i++) {
    let indexI = i;
    let j = i + 1;

    while(j > 0) {
      if (list[j] < list[indexI]) {
        const cache = list[indexI];

        list[indexI] = list[j];
        list[j] = cache;
      }
      j--;
      indexI--;
    }
  }
};

export const sortMerge = (list: number[]) => {
  let count = 0;

  const merge = (left: number[], right: number[]) => {
    const result = [];
    let lIndex = 0;
    let rIndex = 0;
    let lLength = left.length;
    let rLength = right.length;

    while(lIndex < lLength && rIndex < rLength) {
      count++;
      if (left[lIndex] <= right[rIndex]) {
        result.push(left[lIndex++]);
      } else {
        result.push(right[rIndex++]);
      }
    }
    
    while(lIndex < lLength) {
      count++;
      result.push(left[lIndex]);
      lIndex++;
    }
    while(rIndex< rLength) {
      count++;
      result.push(right[rIndex]);
      rIndex++;
    }
    return result;
  };
  const split = (arr: number[]) => {
    if (arr.length > 1) {
      const length = arr.length;
      const mid = Math.floor(length/2);
      const left = arr.slice(0, mid);
      const right = arr.slice(mid, length);
      
      count++;
      return merge(split(left), split(right));
    } else {
      return arr;
    }
  };
  
  return split(list);
};

const sortQuickly = (list: number[]) => {
  let count = 0;

  const newList = [ ...list, ];
  const quick = (arr: number[]) => {
    const indexMain = 0;
    let iLeft = 1;
    let iRight = arr.length - 1;
    
    while(iLeft <= iRight) {
      count++;
      const indexValue = arr[indexMain];

      if (arr[iLeft] >= indexValue && arr[iRight] <= indexValue) {
        let cache = arr[iLeft];
        arr[iLeft] = arr[iRight];
        arr[iRight] = cache;
      }

      if (arr[iLeft] <= indexValue) {
        iLeft++;
      }
      if (arr[iRight] >= indexValue) {
        iRight--;
      }
    }

    const cache = arr[iRight];
    arr[iRight] = arr[indexMain];
    arr[indexMain] = cache;

    let left = arr.slice(0, iRight + 1);
    let right = arr.slice(iRight + 1, arr.length);
    
    if (left.length > 1) {
      left = quick(left);
    }
    if (right.length > 1) {
      right = quick(right);
    }
    
    return left.concat(right);
  };

  return quick(newList);
};

const list = [44,56,7,1,255,489,897,2123,857487,155,8,7,12,34,8,989,78789,45561,2597,9831,18,97,1891];


console.log('sortMerge', sortMerge(list).join(', '));

console.log('sortQuickly', sortQuickly(list).join(', '));

// sortInsert(list);
// console.log('sortInsert', list.join(', '));
