class Greeter {
  greeting: string; // 属性
  constructor(message: string) { // 构造函数
    this.greeting = message;
  }
  greet() { // 方法
    return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world");
console.log(greeter.greet());

// 继承
export class Animal { // 超类
  move(distanceInMeters: number = 0) {
    console.log(`Animal moved ${distanceInMeters}m.`);
  }
}
class Dog extends Animal { // 子类
  brake() {
    console.log('Woof! woof!');
  }
}
const dog = new Dog();
dog.brake();
dog.move(10);
dog.brake();

// 公共，私有与受保护的修饰符
// 默认是 public
// private
export class Animal1 {
  private name: string;  // 不能在申明它的类的外部访问
  // 继承它的子类中也不能访问
  constructor(theName: string) { this.name = theName; }
}
// 属性“name”为私有属性，只能在类“Animal1”中访问。
// new Animal1('Cat').name

// protected
// protected 成员在派生类中仍然可以访问。
class Person {
  protected name: string;
  constructor(name: string) { this.name = name; }
}
class Employee extends Person {
  private department: string;

  constructor(name: string, department: string) {
    super(name);
    this.department = department
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}`;
  }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
// 属性“name”受保护，只能在类“Person”及其子类中访问。
// console.log(howard.name);

// 构造函数也可以标记为 protected
class Person1 {
  protected name: string;
  protected constructor(theName: string) {
    this.name = theName;
  }
}
class Employee1 extends Person1 {
  private department: string;

  constructor(name: string, department: string) {
    super(name);
    this.department = department
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}`;
  }
}
let howard1 = new Employee1("Howard", "Sales");
// 类“Person1”的构造函数是受保护的，仅可在类声明中访问。
// let john1 = new Person1("John");


// readonly 修饰符
class Octopus {
  readonly name: string;
  readonly numberOfLegs: number = 8;
  constructor(theName: string) {
    this.name = theName;
  }
}
let dad = new Octopus("Man with the 8 strong legs");
// dad.name = "Man with the 3-piece suit";  name 是只读属性
// 参数属性
class Octopus1 {
  readonly numberOfLegs: number = 8;
  constructor(private readonly name: string) {
    // 在构造函数中使用参数来创建和初始化 name 成员
    // 同时可以添加 private protected public 修饰符
  }
}

// 存取器
const passwords = "secret passwords";
class Employee2 {
  private _fullName: string;

  // 只带有 get不带有 set的存取器自动被推断为 readonly。
  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    if (passwords && passwords === "secret passwords") {
      console.log('set newName');
      this._fullName = newName;
    } else {
      console.log("Error: Unauthorized update of employee!");
    }
  }
}
let employee3 = new Employee2();
employee3.fullName = "Bob Smith";



// 静态属性
class Grid {
  static origin = { x: 0, y: 0 };
  calculateDistanceFromOrigin(point: { x: number; y: number; }) {
    const xDist = (point.x - Grid.origin.x);
    const yDist = (point.y - Grid.origin.y);
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }
  constructor(public scale: number) { }
}
let grid1 = new Grid(1.0) // 1x scale
let grid2 = new Grid(5.0) // 5x scale
console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));



// 抽象类
// 抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。 
abstract class Department {
  constructor(public name: string) {
  }

  printName(): void {
    console.log('Department name:' + this.name);
  }

  // 抽象方法必须包含 abstract　关键字并且可以包含访问修饰符
  abstract printMeeting(): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {
  constructor() {
    super('Accounting and Auditing');
  }

  printMeeting(): void {
    console.log('The Accounting Department meets each Monday at 10am.');
  }

  generateReports(): void {
    console.log('Generating accounting reports...');
  }
}
let department: Department; // 允许创建一个对抽象类型的引用
// department = new Department(); 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
// department.generateReports();　类型“Department”上不存在属性“generateReports”。
