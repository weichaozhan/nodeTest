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
  public static bbb = 'bbbb';
  public aaa = 123;
  protected pProtected = 'protected';
  private pPrivate: any;
}
// 因为 pPrivate 是私有成员，所以只能够是Control的子类们才能实现 IExtendsInterface 接口
interface IExtendsInterface extends Control {
  doSomething(t?: string): void;
}

class ChildControl extends Control implements IExtendsInterface {
  public doSomething(t: string) {
    console.log('I have a private prop', this.aaa, t, this.pProtected);
  }
}
const childControl: IExtendsInterface = new ChildControl();
childControl.doSomething('123');

console.log('childControl', childControl, Control.bbb);

// 可选链运算符
const props: {
  a: {
    b: {
      c?: {
        d?: number | string; // 空格合并运算符
      }
    }
  }
} = {
  a: {
    b: {
      c: {
        d: 0 ?? 1,
      }
    }
  }
};
console.log('可选链运算符', props?.a?.b?.c?.d);

// 函数
const testFunction: (x: number, y?: string, ...rest: any[]) => any = (x: number, y: string, ...rest) => {
  console.log('rest', rest);
  return x + y;
};

console.log('testFunction', testFunction(1, '2', 'sasdff'));

// 重载
function testOverload(x: number): number;
function testOverload(x: string): string;
function testOverload(x: number | string): number | string {
  if (typeof x === 'number') {
    return x + 1;
  } else if (typeof x === 'string') {
    return `${x} is string`;
  }
}

console.log('testOverload(1)', testOverload(1));
console.log('testOverload(\'x\')', testOverload('x'));

// 泛型
type TGenericFunc<T> = (arg: T[]) => T;
function genericFunc<T>(test: T[]): T {
  return test[0];
}
const newGenericFunc: TGenericFunc<string> = genericFunc;

console.log('genericFunc', genericFunc<number>([1]), newGenericFunc(['newGenericFunc']));

// 泛型约束
interface IGenericR {
  length: number;
}
type TGenericFunc2<T, K extends keyof T> = (arg: T[], K) => T;
function genericFunc2<T extends IGenericR, K extends keyof T>(test: T[], key: K): T {
  console.log('inner genericFunc2', test[0][key]);
  return test[0];
}

interface IALength {
  a: number;
  length: number;
}
genericFunc2([{
  a: 20,
  length: 100,
}], 'length');

// 在泛型里使用类类型
type TNewTest<T> = new () => T;

const buildINewTest = <T>(Create: TNewTest<T>): T => { // create 为 T类 类型，而不是 T类 的实例
  return new Create();
};

console.log('buildINewTest(Array)', buildINewTest(Array));

// 工具类型
interface IToolTypes {
  prop1: number;
  prop2: string;
  prop3: boolean;
  prop4: null;
  prop5: {
    a: number;
  };
}

// 构造类型T，并将它所有的属性设置为可选的。它的返回类型表示输入类型的所有子类型。
const partial: Partial<IToolTypes> = {};

const testReadonly: Readonly<IToolTypes> = {
  prop1: 1,
  prop2: 'string',
  prop3: true,
  prop4: null,
  prop5: {
    a: 2,
  },
};

// Record<K,T> 构造一个类型，其属性名的类型为K，属性值的类型为T。这个工具可用来将某个类型的属性映射到另一个类型上。
type TRecordT = 'title' | 'name' | 'test';
interface IRecordK {
  title: string;
  name: string;
}

const testRecord: Partial<Record<TRecordT, IRecordK>> = {
  title: {
    title: 'title',
    name: 'name',
  }
};
