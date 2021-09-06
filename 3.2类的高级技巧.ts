class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}

let greeter: Greeter = new Greeter("world");
console.log(greeter.greet());

class Greeter1 {
  static standardGreeting = "Hello, there";
  greeting: string;
  greet() {
    if (this.greeting) {
      return "Hello, " + this.greeting;
    }
    else {
      return Greeter1.standardGreeting;
    }
  }
}

let greeter1: Greeter1;
greeter1 = new Greeter1();
console.log(greeter1.greet());

// typeof Greeter1，意思是取 Greeter1 类的类型，而不是实例的类型。
// "告诉我 Greeter1 标识符的类型"，也就是构造函数的类型。
// 这个类型包含了类的所有静态成员和构造函数。
let greeterMaker: typeof Greeter1 = Greeter1;
greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter = new greeterMaker();
console.log(greeter2.greet());