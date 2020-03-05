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
}

export const sortInsert = (list: number[]) => {
  for (let i = 0; i < list.length; i++) {
    let indexI = i
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
}

const list = [44,56,7,1,255,489,897,2123,857487,155,8,7,12,34,8,989,78789,45561,2597,9831,18,97,1891];

sortInsert(list);

console.log(list.join(', '));
