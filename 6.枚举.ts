enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
// console.log(Object.getOwnPropertyDescriptor(Direction, 'Up'));

enum E { X }
// E.X = 100; 无法分配到 "X" ，因为它是只读属性。
console.log(E.X);

enum FileAccess {
  // constant members
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  // computed member
  G = "123".length
}

enum ShapeKind {
  Circle,
  Square,
}
interface Circle {
  kind: ShapeKind.Circle;
  radius: number
}
interface Square {
  kind: ShapeKind.Square;
  sideLength: number;
}
let c: Circle = {
  kind: ShapeKind.Circle,
  // kind: 0, √
  // kind: 1, √
  // kind: ShapeKind.Square, ×
  radius: 100
}

enum E1 {
  Foo,
  Bar,
}

// function f(x: E1) {
  // 此条件将始终返回 "true"，因为类型 "E1.Foo" 和 "E1.Bar" 没有重叠。
  // if (x !== E1.Foo || x !== E1.Bar) {
  // }
// }