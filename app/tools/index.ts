export const validRequired = (params: any, required: string[]): boolean | string => {
  const lacks = [];

  required.forEach(item => {
    (!params[item] && params[item] !== 0) && lacks.push(item);
  });

  return lacks.length === 0 ? false : `keys ${lacks.join()} is required !`;
};
