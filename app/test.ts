const obj: Test.ITest ={
  a: '123',
  b: 123,
};
let tom: [string, number, string];

tom = ['Tom', 123, '112'];
tom[2] = '';

console.log(`\n\n ${JSON.stringify(obj)}`, tom);


enum Days { Sun, Mon, Tue, Wed, Thu, Fri, Sat, }

console.log('\n\n\nDays', Days);

interface IA {
  a?: string;
  b?: string;
}

const at = {
  a: '',
  c: 123
};
const bt: IA = at;

type TSearchFunc = (a?: string, b?: number) => boolean;
const searchFunc: TSearchFunc = (a = '', b = 1) => !(a + b);
searchFunc();

interface ITArray {
  length: string;
  readonly name?: string;
  [index: number]: number;
}
const tarray: ITArray = {
  1: 111,
  length: '',
  name: '1',
};
// tarray.name = '2';
console.log('\n\ntarray', tarray); 

// 类实现接口
interface ITConstructor {
  new (fa: string, fb?: number);
}
interface ITClass {
  tcprop: string;
}

const TconInterface: ITConstructor = class ImClass implements ITClass {
  public tcprop = 'tcprop';
  public constructor(fa: string, fb?: number) {
    console.log('fa + fb', fa + fb);
  }
};

const iminterface = new TconInterface('test', 123);

console.log('iminterface', iminterface);

// 混合类型
interface Counter {
  interval: number;
  reset(): void;
  (start: number): string;
}

function getCounter(): Counter {
  // let counter = <Counter>function (start: number): string { return '' }; // 断言
  let counter = function (start: number): string {
    return '';
  } as Counter; // 断言
  counter.interval = 123;
  counter.reset = function () { };
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

// 接口继承类
class Control {
  private pPrivate = 'string';
}
// 因为 pPrivate 是私有成员，所以只能够是Control的子类们才能实现 IExtendsInterface 接口，Control 子类可访问私有成员 
interface IExtendsInterface extends Control {
  doSomething(t?: string): void;
}

class ChildControl extends Control implements IExtendsInterface {  
  public doSomething(t) {
    console.log('I have a private prop');
  }
}

const childControl = new ChildControl();
console.log('childControl', childControl);
