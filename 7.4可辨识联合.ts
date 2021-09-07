// 你可以合并单例类型，联合类型，类型保护和类型别名来创建一个叫做 可辨识联合的高级模式，它也称做 标签联合或 代数数据类型。
// 它具有3个要素：
// 1. 具有普通的单例类型属性 —- 可辨识的特征。
// 2. 一个类型别名包含了那些类型的联合 -— 联合。
// 3. 此属性上的类型保护。

interface Square {
  kind: "square";
  size: number;
}
interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}
interface Circle {
  kind: 'circle';
  radius: number;
}
interface Triangle {
  kind: 'triangle',
  h: number;
  d: number;
}
function assertNever(x: any): never {
  throw new Error("Unexpected object: " + x);
}
// kind 属性称为 可辨识的特征或者标签
// 通过联合将各个接口联系起来
type Shape = Square | Rectangle | Circle | Triangle;
function area(s: Shape): number {
  switch (s.kind) {
    case 'square': return s.size * s.size;
    case 'rectangle': return s.width * s.height;
    case 'circle': return Math.PI * s.radius ** 2;
    default: return assertNever(s);
  }
}
