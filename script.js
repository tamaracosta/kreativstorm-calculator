const undoBtn = document.querySelector('.undoButton');
const currentNumEl = document.querySelector(".results");
const prevNumEl = document.getElementById("prevNum");
const numButton = document.querySelectorAll('.number');
const equalEl = document.querySelector('.equal');
const operator = document.querySelectorAll('.operator');
const clearAll = document.querySelector('.clear-input');

let currentNum = "";
let prevNum = "";
let result = null;
let lastOperation = "";
let haveDot = false;

numButton.forEach(button => {
   button.addEventListener("click", (e) => {
        if(e.target.value === "." && !haveDot){
            haveDot = true;
        }else if(e.target.value === "." && haveDot){
            return;
        }
        currentNum += e.target.value;
        currentNumEl.innerText = currentNum;
    })
})

operator.forEach(operation =>{
    operation.addEventListener("click", (e) => {
        if(!currentNum) return;
        haveDot = false;
        const operationName = e.target.value;
        if(currentNum && prevNum && lastOperation){
            mathOperation();
        }else{
            result = parseFloat(currentNum);
        }
        clearCurrentNum(operationName);
        lastOperation = operationName;
    })
})

function clearCurrentNum(name = ""){
    prevNum += currentNum + " " + name + " ";
    prevNumEl.innerText = prevNum;
    currentNumEl.innerText = result;
    currentNum = "";
}
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if(b === 0) {
        return 'Error: Division by zero';
    }
    return a / b;
}
function operate(operator, num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch(operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return 'Invalid Operator';
    }
}

equalEl.addEventListener("click", (e) =>{
    if(!currentNum || !prevNum) return;
    haveDot = false;
    operate();
    clearCurrentNum();
    currentNumEl.innerText = result;
    currentNum = result;
    prevNum = "";
})

clearAll.addEventListener("click", (e) =>{
    prevNumEl.innerText = "0";
    currentNumEl.innerText = "0";
    currentNum = "";
    prevNum = "";
    result = "";
})

undoBtn.addEventListener("click", () =>{
    if(currentNumEl.innerText === "0") return;
    currentNum = currentNumEl.innerText;
    currentNum = currentNum.slice(0,-1);
    currentNumEl.innerText = currentNum;

})