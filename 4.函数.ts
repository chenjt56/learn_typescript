// 函数类型
function add(x: number, y: number): number {
  return x + y
}
let myAdd1 = function (x: number, y: number): number { return x + y }

// 完整函数类型
// 函数类型包含两部分：参数类型和返回值类型。
let myAdd2: (x: number, y: number) => number
  = function (x: number, y: number): number {
    return x + y;
  }



// 可选参数和默认参数
function buildName1(firstName: string, lastName: string) {
  return firstName + " " + lastName;
}
// let result1 = buildName("Bob");
// let result2 = buildName("Bob", "Adams", "Sr.")


let result3 = buildName1("Bob", "Adams");
function buildName2(firstName: string, lastName = "Smith") {
  return firstName + " " + lastName;
}

let result1 = buildName2("Bob");
let result2 = buildName2("Bob", undefined);
// let result3 = buildName2("Bob", "Adams", "Sr.");
let result4 = buildName2("Bob", "Adams");


let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: { suit: string; card: number; }[]): number;
function pickCard(x: number): { suit: string; card: number; };
function pickCard(x): any {
  // Check to see if we're working with an object/array
  // if so, they gave us the deck and we'll pick the card
  if (typeof x == "object") {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  }
  // Otherwise just let them pick the card
  else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit);