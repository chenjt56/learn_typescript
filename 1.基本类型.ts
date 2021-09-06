// 布尔值
let isDone: boolean = true;


// 数字
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;


// 字符串
let name_here: string = "bob";
name_here = 'smith';
let age: number = 22;
let sentence: string = `Hello, my name is ${name_here} .
I'll be ${age + 1} years old next mouth.`;


// 数组
let list1: number[] = [1, 2, 3]
// 数组泛型
let list2: Array<number> = [1, 2, 3]


// 元组
// 1. 元组类型允许表示一个一直元素数量和类型的数组
let x: [string, number];
x = ['hello', 100];
// x = [10, 'hello'];  error

// 2. 访问一直索引的元素，会得到正确的类型
console.log(x[0].substr(1));
// console.log(x[1].substr(1)); 类型“number”上不存在属性“substr”。

// 3. 当访问一个越界的元素，会使用联合类型替代?  不能访问越界元素
// x[3] = 'world'


// 类型断言
// 1. 尖括号语法
let someValue: any = 'this is a string';
let strLength: number = (<string>someValue).length

// 2. as 语法 
// 在 typescript 里使用 JSX 时，只能用 as 语法
let anotherValue: any = 'this is a string';
let strLen: number = (someValue as string).length