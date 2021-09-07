// 类型别名会给一个类型起个新名字。
// 起别名不会新建一个类型，它创建了一个新的名字来引用那个类型
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameResolver): Name {
  if (typeof n === 'string') {
    return n;
  } else {
    return n();
  }
}
// 类型别名也可以是泛型
type Container<T> = { value: T };
// 也可以自己引用自己
type Tree<T> = {
  value: T;
  left: Tree<T>;
  right: Tree<T>;
}
// 与交叉类型一起使用
type LinkedList<T> = T & { next: LinkedList<T> };
interface Person {
  name: string
}
let people: LinkedList<Person>;
let s1 = people.name;
let s2 = people.next.name;
let s3 = people.next.next.name;
