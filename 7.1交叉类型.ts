// 交叉类型是将多个类型合并为一个类型
// 把现有的多种类型 "叠加" 到一起成为一种类型，它包含了所需的所有类型的特性
// 一般在混入（mixins）或者其他不适用典型面向对象模型的地方看到交叉类型的使用
function extend<T, U>(first: T, second: U): T & U {
  let res = <T & U>{};
  for (let id in first) {
    (<any>res)[id] = (<any>first)[id];
  }
  for (let id in second) {
    (<any>res)[id] = (<any>second)[id];
  }
  return res;
}

class Person {
  constructor(public name: string) { }
  log() {
    console.log('person log');
  }
}
interface Loggable {
  log(): void;
}
class ConsoleLogger implements Loggable {
  log() {
    console.log('just a log');
  }
}

let jim = extend(new Person('Jim'), new ConsoleLogger());
console.log(jim.name);
jim.log();