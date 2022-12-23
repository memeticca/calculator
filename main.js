let currentOperation = document.getElementById("current-operation");
let lastOperation = document.getElementById("last-operation");
let numberSize = currentOperation.clientWidth;
let hasOperator = false;
let currentOperator;

function appendNumber() {
    currentOperation.innerText = (currentOperation.innerText == "0") ? this.innerText : currentOperation.innerText + this.innerText
}

function operate() {
    if (!hasOperator) {
        currentOperation.innerText += this.innerHTML;
        lastOperation.innerText = currentOperation.innerText;
        currentOperation.innerText = "0";

        hasOperator = true
        currentOperator = operatorsList[this.innerHTML];
    } else {
        let number = lastOperation.innerText.slice(0, lastOperation.innerText.length - 1);
        let operationResult = currentOperator(Number(number), Number(currentOperation.innerText));
        currentOperation.innerText = operationResult;
        lastOperation.innerText = "";

        hasOperator = false
        currentOperator = undefined;
    }
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
    hasOperator = false
    currentOperator = undefined
}

function deleteNumber() {
    let text = currentOperation.innerText;
    currentOperation.innerText = (text.length <= 1) ? 0 : text.slice(0, -1);
}

const addition = (a, b) => a + b;
const subtraction = (a, b) => a - b;
const multiplication = (a, b) => a * b;
const division = (a, b) => a / b;
const modulo = (a, b) => a % b;

let operatorsList = {
    "+": addition,
    "-": subtraction,
    "×": multiplication,
    "÷": division,
    "%": modulo,
};

let numberButton = document.querySelectorAll("#number");
numberButton.forEach(button => {
    button.addEventListener("click", appendNumber);
})

let operatorsButton = document.querySelectorAll("#operator");
operatorsButton.forEach(button => {
    button.addEventListener("click", operate);
})

let equalsButton = document.getElementById("equals");
equals.addEventListener("click", operate);

let signButton = document.getElementById("change-sign");
signButton.addEventListener("click", changeSign);

let decimalButton = document.getElementById("decimal");
decimalButton.addEventListener("click", changeToDecimal);

let clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clearScreen);

let deleteButton = document.getElementById("delete");
deleteButton.addEventListener("click", deleteNumber);