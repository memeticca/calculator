let currentOperation = document.getElementById("current-operation");
let lastOperation = document.getElementById("last-operation");

let currentOperator;
let hasOperator = false;

let operatorsList = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "×": (a, b) => a * b,
  "÷": (a, b) => a / b,
  "%": (a, b) => a % b,
};

let numberButton = document.querySelectorAll("#number");
numberButton.forEach((button) => {
  button.addEventListener("click", appendNumber);
});

let operatorsButton = document.querySelectorAll("#operator");
operatorsButton.forEach((button) => {
  button.addEventListener("click", appendOperator);
});

function appendNumber() {
  currentOperation.innerText =
    currentOperation.innerText === "0"
      ? this.innerText
      : currentOperation.innerText + this.innerText;
}

function appendOperator() {
  if (!hasOperator) {
    currentOperation.innerText += this.innerText;
    lastOperation.innerText = currentOperation.innerText;
    currentOperation.innerText = "0";
    currentOperator = this.innerText;
    hasOperator = true;
  } else {
    lastOperation.innerText = lastOperation.innerText.replace(
      currentOperator,
      this.innerText
    );
    currentOperator = this.innerText;
  }
}

function operate() {
  if (!hasOperator) {
    return;
  }
  let number = lastOperation.innerText.slice(
    0,
    lastOperation.innerText.length - 1
  );
  let operationResult = operatorsList[currentOperator](
    Number(number),
    Number(currentOperation.innerText)
  );
  currentOperation.innerText = operationResult;
  lastOperation.innerText = "";

  currentOperator = undefined;
  hasOperator = !hasOperator;
}

function changeSign() {
  let number = Number(currentOperation.innerHTML);
  currentOperation.innerText = -number;
}

function changeToDecimal() {
  if (currentOperation.innerText.search(/\./) == -1) {
    currentOperation.innerText += ".";
  }
}

function clearScreen() {
  currentOperation.innerText = "0";
  lastOperation.innerText = "";
  hasOperator = false;
  currentOperator = undefined;
}

function deleteNumber() {
  let text = currentOperation.innerText;
  currentOperation.innerText = text.length <= 1 ? 0 : text.slice(0, -1);
}
