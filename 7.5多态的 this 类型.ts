class BasicCalculator {
  constructor(protected value: number = 0) { }
  public currentValue(): number {
    return this.value;
  }
  public add(operand: number): this {
    this.value += operand;
    return this;
  }
  public multiply(operand: number): this {
    this.value *= operand;
    return this;
  }
}

const value = new BasicCalculator(2).multiply(5).add(1).currentValue();
console.log(value);

class ScientificCalculator extends BasicCalculator {
  constructor(value = 0) {
    super(value);
  }
  public sin() {
    this.value = Math.sin(this.value);
    return this;
  }
}

const val = new ScientificCalculator(2).multiply(5).sin().add(1).currentValue();
console.log(val);
