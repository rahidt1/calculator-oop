import displayNumber from "./displayNumber.js";

export default class Calculator {
  #primaryOperandDisplay;
  #secondaryOperandDisplay;
  #operationDisplay;
  constructor(
    primaryOperandDisplay,
    secondaryOperandDisplay,
    operationDisplay
  ) {
    this.#primaryOperandDisplay = primaryOperandDisplay;
    this.#secondaryOperandDisplay = secondaryOperandDisplay;
    this.#operationDisplay = operationDisplay;

    // Initial state as soon as calculator loads
    this.clear();
  }

  get #primaryOperand() {
    return parseFloat(this.#primaryOperandDisplay.dataset.value);
  }
  set #primaryOperand(value) {
    this.#primaryOperandDisplay.dataset.value = value ?? "";
    this.#primaryOperandDisplay.textContent = displayNumber(value);
  }

  get #secondaryOperand() {
    return parseFloat(this.#secondaryOperandDisplay.dataset.value);
  }
  set #secondaryOperand(value) {
    this.#secondaryOperandDisplay.dataset.value = value ?? "";
    this.#secondaryOperandDisplay.textContent = displayNumber(value || "");
  }

  get #operation() {
    return this.#operationDisplay.textContent;
  }
  set #operation(value) {
    this.#operationDisplay.textContent = value ?? "";
  }

  addDigit(digit) {
    if (
      digit === "." &&
      this.#primaryOperandDisplay.dataset.value.includes(".")
    )
      return;

    if (this.#primaryOperand === 0) {
      this.#primaryOperand = digit;
      return;
    }

    this.#primaryOperand = this.#primaryOperandDisplay.dataset.value + digit;
  }

  removeDigit() {
    const numberString = this.#primaryOperandDisplay.dataset.value;
    this.#primaryOperand = numberString.slice(0, numberString.length - 1);

    if (!this.#primaryOperand) this.#primaryOperand = 0;
  }

  chooseOperation(operation) {
    if (this.#operation !== "") return;

    this.#operation = operation;
    this.#secondaryOperand = this.#primaryOperand;
    this.#primaryOperand = 0;
  }

  evaluate() {
    let result;
    switch (this.#operation) {
      case "÷":
        result = this.#secondaryOperand / this.#primaryOperand;
        break;
      case "*":
        result = this.#secondaryOperand * this.#primaryOperand;
        break;
      case "+":
        result = this.#secondaryOperand + this.#primaryOperand;
        break;
      case "-":
        result = this.#secondaryOperand - this.#primaryOperand;
        break;
      default:
        return;
    }

    this.clear();
    this.#primaryOperand = result;
  }

  clear() {
    this.#primaryOperand = 0;
    this.#secondaryOperand = null;
    this.#operation = null;
  }
}
