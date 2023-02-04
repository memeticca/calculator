const calculator = {
  operand1: 0,
  operand2: 0,
  operator: undefined,
  decimalMode: false,
  mathOperations: {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "×": (a, b) => a * b,
    "÷": (a, b) => a / b,
    "%": (a, b) => a % b,
  },

  getActiveOperand: () => (calculator.operator ? "operand2" : "operand1"),
  setActiveOperand: (value) => {
    const activeOperand = calculator.getActiveOperand();
    calculator[activeOperand] = value;
  },
  isDecimal: (value) => {
    if (typeof value === "number" && !Number.isInteger(value)) {
      return true;
    }
    return false;
  },
  changeToScientific: (number, maxSize) =>
    Number(number.toFixed(maxSize / 2)).toExponential(),
  toDefault: () => {
    calculator.operand1 = 0;
    calculator.operand2 = 0;
    calculator.decimalMode = false;
    calculator.operator = undefined;
  },
};

const DOMCalculator = {
  currentOperation: document.querySelector(".current-operation"),
  pastOperation: document.querySelector(".past-operation"),
  screen: document.querySelector(".screen"),

  drawCurrentOperation: (text) => {
    DOMCalculator.currentOperation.innerText = text;
  },
  drawPastOperation: (text) => {
    DOMCalculator.pastOperation.innerText = text;
  },
  toDefault: () => {
    DOMCalculator.drawCurrentOperation("0");
    DOMCalculator.drawPastOperation("");
  },
};

// Get the maximum amount of numbers that can go on the screen
let { width: screenSize } = window.getComputedStyle(DOMCalculator.screen);
let { fontSize } = window.getComputedStyle(DOMCalculator.currentOperation);
fontSize = parseInt(fontSize.match(/\d+/).join(""), 10);
screenSize = parseInt(screenSize.match(/\d+/).join(""), 10);
const maxNumberSize = Math.floor((screenSize / fontSize) * 2);

const numbers = document.querySelectorAll("#number");
numbers.forEach((button) => {
  button.addEventListener("click", appendNumber);
});

const operators = document.querySelectorAll("#operator");
operators.forEach((button) => {
  button.addEventListener("click", appendOperator);
});

function appendNumber() {
  const activeOperand = calculator.getActiveOperand();
  const operandValue = calculator[activeOperand];

  if (`${operandValue}`.length === maxNumberSize) {
    return;
  }

  if (!calculator.decimalMode) {
    calculator.setActiveOperand(Number(`${operandValue}${this.innerText}`));
  } else {
    calculator.setActiveOperand(Number(`${operandValue}.${this.innerText}`));
    calculator.decimalMode = false;
  }

  DOMCalculator.drawCurrentOperation(calculator[activeOperand]);
}

function appendOperator() {
  if (calculator.operator) {
    DOMCalculator.drawPastOperation(
      DOMCalculator.pastOperation.innerText.replace(
        calculator.operator,
        this.innerText
      )
    );
    calculator.operator = this.innerText;
    return;
  }

  calculator.decimalMode = false;
  calculator.operator = this.innerText;
  let operandValue;
  if (`${calculator.operand1}`.length > maxNumberSize) {
    operandValue = calculator.changeToScientific(
      calculator.operand1,
      maxNumberSize
    );
  } else {
    operandValue = calculator.operand1;
  }

  DOMCalculator.drawPastOperation(`${operandValue}${calculator.operator}`);
}

function operate() {
  if (!calculator.operator) {
    return;
  }

  const operationResult = calculator.mathOperations[calculator.operator](
    calculator.operand1,
    calculator.operand2
  );

  DOMCalculator.toDefault();
  if (`${operationResult}`.length > maxNumberSize) {
    DOMCalculator.drawCurrentOperation(
      calculator.changeToScientific(operationResult, maxNumberSize)
    );
  } else {
    DOMCalculator.drawCurrentOperation(operationResult);
  }

  calculator.toDefault();
  calculator.operand1 = operationResult;
}

function changeSign() {
  const activeOperand = calculator.getActiveOperand();
  const operandValue = calculator[activeOperand];
  calculator.setActiveOperand(-operandValue);
  DOMCalculator.drawCurrentOperation(calculator[activeOperand]);
}

function changeToDecimal() {
  const activeOperand = calculator.getActiveOperand();
  const operandValue = calculator[activeOperand];

  if (!calculator.isDecimal(operandValue) && !calculator.decimalMode) {
    DOMCalculator.drawCurrentOperation(`${operandValue}.`);
    calculator.decimalMode = true;
  }
}

function deleteNumber() {
  const activeOperand = calculator.getActiveOperand();
  const operandValue = calculator[activeOperand];
  const changedValue =
    `${Math.abs(operandValue)}`.length <= 1
      ? 0
      : Number(`${operandValue}`.slice(0, -1));

  calculator.setActiveOperand(changedValue);
  DOMCalculator.drawCurrentOperation(calculator[activeOperand]);
}

function clearScreen() {
  DOMCalculator.toDefault();
  calculator.toDefault();
}
