// 泛型值 Hello World
function identity1(arg: number): number {
  return arg;
};
// 使用 any 导致这个函数可以接收任何类型的 arg 参数
// 丢失信息：传入的类型和返回的类型应该是相同的
// 比如传入一个数字，我们只知道任何类型的值都有可能被返回
function identity2(arg: any): any {
  return arg;
}
// 类型变量，特殊的变量，表示类型而不是值
function identity3<T>(arg: T): T {
  return arg;
}
// 这个函数就被称为泛型函数
// 使用方法
// 1. 传入所有的参数，包括类型参数
const output1 = identity3<string>("maString");
// 2. 利用类型推断：编译器会根据传入的参数自动地帮我们确认 T 的类型
const output2 = identity3("myString");



// 使用泛型变量
function identity4<T>(arg: T): T {
  // console.log(arg.length); 类型“T”上不存在属性“length”。
  return arg;
}
function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
}


// 泛型函数
function identity5<T>(arg: T): T {
  return arg;
}
let myIdentity1: <T>(arg: T) => T = identity5;
let myIdentity2: <U>(arg: U) => U = identity5;
// 带签名的对象字面量来定义泛型函数
let myIdentity3: { <T>(arg: T): T } = identity5;

// 泛型接口
interface GenericIdentityFn {
  <T>(arg: T): T;
}
function identity6<T>(arg: T): T {
  return arg;
}
let myIdentity4: GenericIdentityFn = identity6;



// 泛型类
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y }

let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) { return x + y; };

console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));



// 泛型约束
// 定义一个接口来描述约束条件
interface Lengthwise {
  length: number;
}
function loggingIdentity1<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
// loggingIdentity1(1); 类型“number”的参数不能赋给类型“Lengthwise”的参数
// 传入的参数必须含有 length 的属性
loggingIdentity1({ value: 3, length: 10 });

// 在泛型约束中使用类型参数
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
let x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, 'a');
// getProperty(x, 'm'); 类型“"m"”的参数不能赋给类型“"a" | "b" | "c" | "d"”的参数
