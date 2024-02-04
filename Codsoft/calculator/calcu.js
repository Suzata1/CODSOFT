let screen = document.querySelector(".screen");
let numbers = [null, null];
let operator = null;
let decimalCount = 0;

function clearScreen() {
  screen.innerHTML = "";
  numbers = [null, null];
  operator = null;
  decimalCount = 0;
}

function showOutput(value) {
  screen.innerHTML = value;
}

function handleOperator(selectedOperator) {
  if (operator !== null) {
    calculateResult();
  }
  operator = selectedOperator;
  decimalCount = 0;
}

function handleNumber(number) {
  if (decimalCount === 1) {
    if (numbers[1] !== null) {
      numbers[1] += number.toString();
    } else {
      numbers[0] += number.toString();
    }
  } else if (numbers[0] === null) {
    numbers[0] = number.toString();
  } else if (operator !== null && numbers[1] === null) {
    numbers[1] = number.toString();
  } else if (operator !== null && numbers[1] !== null) {
    numbers[1] += number.toString();
  } else {
    numbers[0] += number.toString();
  }
  showOutput(numbers.join(operator || ''));
}

function handleDecimal() {
  if (decimalCount === 0) {
    let index = numbers[1] !== null ? 1 : 0;
    numbers[index] = numbers[index] === null ? '0.' : numbers[index] + '.';
    decimalCount = 1;
    showOutput(numbers.join(operator || ''));
  }
}


function calculateResult() {
  if (operator !== null && numbers[1] !== null) {
    let result;
    switch (operator) {
      case '+':
        result = parseFloat(numbers[0]) + parseFloat(numbers[1]);
        break;
      case '-':
        result = parseFloat(numbers[0]) - parseFloat(numbers[1]);
        break;
      case '*':
        result = parseFloat(numbers[0]) * parseFloat(numbers[1]);
        break;
      case '/':
        if (parseFloat(numbers[1]) !== 0) {
          result = parseFloat(numbers[0]) / parseFloat(numbers[1]);
        } else {
          showOutput("Error");
          clearScreen();
          return;
        }
        break;
      default:
        return;
    }
    showOutput(result);
    numbers = [result, null];
    operator = null;
    decimalCount = result.toString().includes(".") ? 1 : 0;
  }
}

