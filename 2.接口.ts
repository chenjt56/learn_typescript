let myObj = { size: 10, label: 'Size 10 Object' }

function printLabel1(labelledObj: { label: string }) {
  console.log(labelledObj.label);
}

printLabel1(myObj);

interface LabelledValue {
  label: string;
}

function printLabel2(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}
printLabel2(myObj)


interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({ color: "black" });



// 只读属性
interface Point {
  readonly x: number;
  readonly y: number;
}
// 通过字面量构造一个 Point，之后就不能修改
let p1: Point = { x: 10, y: 20 }
// p1.x = 100 无法分配到 "x" ，因为它是只读属性。

// 只读数组，去掉了所有可变方法
let arr: number[] = [1, 2, 3, 4];
let roArr: ReadonlyArray<number> = arr;
// roArr[0] = 12 类型“readonly number[]”中的索引签名仅允许读取。
// arr = roArr 类型 "readonly number[]" 为 "readonly"，不能分配给可变类型 "number[]"。
arr = roArr as number[]

// readonly vs const
// 作为变量使用 const，作为树形使用 readonly



// 定义一个含有任意数量属性的接口
interface SquareConfig1 {
  color?: string;
  width?: string;
  [propName: string]: any;
}


// 函数类型
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch1: SearchFunc;
mySearch1 = function (source: string, subString: string) {
  let res = source.search(subString);
  return res > -1;
}
// 参数名称不需要与接口中匹配
let mySearch2: SearchFunc;
mySearch2 = function (src: string, sub: string) {
  let res = src.search(sub);
  return res > -1;
}
// 不指定类型，ts 会推断出参数类型
let mySearch3: SearchFunc = function (src, sub) {
  let res = src.search(sub);
  return res > -1;
}



// 可索引的类型
// ts 支持两种索引签名： 字符串和数字。
// 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型
// 原因： 使用 number 作为索引时，js 会将它转化为 string 然后再去索引对象
class Animal {
  name: string;
}
class Dog extends Animal {
  breed: string;
}
interface Okay {
  [x: string]: Animal;
  [x: number]: Dog;
}
// interface NotOkay { 数字索引类型“Animal”不能赋给字符串索引类型“Dog”。
//   [x: number]: Animal;
//   [x: string]: Dog
// }

interface NumberDictionary {
  [index: string]: number;
  length: number;    // 可以，length是number类型
  // name: string    错误，`name`的类型与索引类型返回值的类型不匹配
}

interface ReadonlyStringArray {
  readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = ["Alice", "Bob"];
// myArray[2] = "Mallory"; 类型“ReadonlyStringArray”中的索引签名仅允许读取。



// 类类型
// ts 可以使用类类型的接口强制一个类去符合某种契约
// 接口描述了类的公共部分，而不是公共和私有两部分，它不会检查类是否具有某些私有成员
interface ClockInterface1 {
  currentTime: Date;
  setTime(d: Date)
}
class Clock implements ClockInterface1 {
  currentTime: Date;
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) { }
}

// 类静态部分和实例部分的区别
interface ClockInterface2 {
  new(hour: number, minute: number);
}
// 类型“Clock2”提供的内容与签名“new (hour: number, minute: number): any”不匹配。
// class Clock2 implements ClockInterface2 {
//   currentTime: Date;
//   constructor(h: number, m: number) { }
// }

interface ClockConstructor {
  new(hour: number, minute: number): ClockInterface
}
interface ClockInterface {
  tick();
}
function createClock
  (ctor: ClockConstructor, hour: number, minute: number)
  : ClockInterface {
  return new ctor(hour, minute)
}
class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() {
    console.log("beep beep");
  }
}
class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() {
    console.log('tick tock');
  }
}
let digital = createClock(DigitalClock, 12, 17)
let analog = createClock(AnalogClock, 7, 32)




//  继承接口
interface Shape {
  color: string;
}
interface Square extends Shape {
  sideLength: number;
}
let square1 = <Square>{};
square1.color = "blue";
square1.sideLength = 10;
// 一个接口可以继承多个接口，创建出多个接口的合成接口
interface PenStroke {
  penWidth: number;
}
interface Square2 extends Shape, PenStroke {
  sideLength: number;
}
let square2 = <Square2>{};
square2.color = "red";
square2.penWidth = 5.0;
square2.sideLength = 10;



// 混合类型
// 一个对象可以当函数使用，同时又具有属性和方法
interface Counter {
  (start: number): string; // 函数
  interval: number;  // 属性
  reset(): void;    // 函数属性
}
function getCounter(): Counter {
  // 函数签名相同，返回值非 void 类型的函数可以赋值给返回值是 void 类型的函数
  let counter = <Counter>function (start: number) { };
  counter.interval = 123;
  counter.reset = function () { }
  return counter;
}
let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;




// 接口继承类
// 当接口继承了一个类类型时，它会继承类的成员但不包括其实现。
class Control {
  private state: any;
}
interface SelectableControl extends Control {
  select(): void;
}
class Button extends Control implements SelectableControl {
  select() { }
}
class TextBox extends Control {
  select() { }
}
// 类型 "Image1" 中缺少属性 "state"，但类型 "SelectableControl" 中需要该属性。
// class Image1 implements SelectableControl {
//   select() { }
// }
