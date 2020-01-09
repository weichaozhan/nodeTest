import { event, } from './eventCustiom';

export const validRequired = (params: any, required: string[]): boolean | string => {
  const lacks = [];

  required.forEach(item => {
    (!params[item] && params[item] !== 0) && lacks.push(item);
  });

  return lacks.length === 0 ? false : `keys ${lacks.join()} is required !`;
};

const a = () => {
  console.log('click a');
};
const b = () => {
  console.log('click b');
};

event.on('click', a);

event.on('click', b);

event.on('click', () => {
  console.log('click 3');
});

event.emit('click');

console.log('\n\n\n\n');

event.off('click', a);

event.emit('click');

console.log('\n\n\n\n');

event.off('click');

setTimeout(() => {
  event.emit('click');
}, 1000);
