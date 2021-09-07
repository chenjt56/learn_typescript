// 联合类型与交叉类型很有关联，但是使用上却完全不同

/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
// 联合类型作为参数
function padLeft(value: string, padding: number | string) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}
// 这些* typeof类型保护*只有两种形式能被识别： typeof v === "typename"和 typeof v !== "typename"
//  "typename"必须是 "number"， "string"， "boolean"或 "symbol"。 
console.log(padLeft("Hello world", 4));

// 编译阶段通过，运行时报错
// let indentedString = padLeft("Hello world", true);

interface Bird {
  fly();
  layEggs();
}
interface Fish {
  swim();
  layEggs();
}
function getSmallPet(): Fish | Bird {
  const time = new Date().getTime();
  if (time % 2 === 0) {
    return
  } else {
    return
  }
}

let pet = getSmallPet();
pet.layEggs();
// pet.swim(); 类型“Bird | Fish”上不存在属性“swim”。类型“Bird”上不存在属性“swim”。
// 如果一个值的类型是 A|B，我们能够确认的是它包含 A 和 B 中共有的成员。


// 类型保护和区分类型
// if (pet.swim) {
//   pet.swim()
// } else if (pet.fly) {
//   pet.fly()
// }
// 依旧报错
// 应该使用类型断言
if ((<Fish>pet).swim) {
  (<Fish>pet).swim();
} else {
  (<Bird>pet).fly();
}

// 类型保护机制：
// 就是一些表达式，它们在运行时检查以确保在某个作用域里的类型
function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined;
}
// pet is Fish 是类型谓词。谓词为 parameterName is Type这种形式， parameterName必须是来自于当前函数签名里的一个参数名。
// ts 不仅知道 if 分支中的 pet 是 Fish 类型，还知道 else 分支中的 pet 是 Bird 类型
if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}


// instanceof 类型保护
// instanceof 类型保护是通过构造函数来细化类型的一种方式。
interface Padder {
  getPaddingString(): string
}
class SpaceRepeatingPadder implements Padder {
  constructor(private nameSpaces: number) { }
  getPaddingString() {
    return Array(this.nameSpaces + 1).join(' ');
  }
}
class StringPadder implements Padder {
  constructor(private value: string) { }
  getPaddingString() {
    return this.value;
  }
}
function getRandomPadder() {
  return Math.random() < 0.5 ?
    new SpaceRepeatingPadder(4) :
    new StringPadder("    ")
}
// SpaceRepeatingPadder | StringPadder
let padder: Padder = getRandomPadder();
if (padder instanceof SpaceRepeatingPadder) {
  padder;  // 类型细化为'SpaceRepeatingPadder'
}
if (padder instanceof StringPadder) {
  padder;  // 类型细化为'StringPadder'
}