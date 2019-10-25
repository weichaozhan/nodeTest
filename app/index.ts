import test from './test';

console.log('test', test);

setTimeout(() => {
  console.log('\n second --> ', 'test', test);
}, 3000);