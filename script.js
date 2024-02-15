const undoBtn = document.querySelector('.undoButton');
const currentNumEl = document.querySelector(".results");
const prevNumEl = document.getElementById("prevNum");
const numButton = document.querySelectorAll('.number');
const equalEl = document.querySelector('.equal');
const operator = document.querySelectorAll('.operator');
const clearAll = document.querySelector('.clear-input');
const sound = document.querySelectorAll('.sound');

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
            result = operate(parseFloat(result), parseFloat(currentNum), lastOperation);
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
    return parseFloat((a + b).toFixed(2));
}

function subtract(a, b) {
    return parseFloat((a - b).toFixed(2));
}

function multiply(a, b) {
    return parseFloat((a * b).toFixed(2));
}

function divide(a, b) {
    if (b === 0) {
        alert('Error: Division by zero')
        return a;
    }
    return parseFloat((a / b).toFixed(2));
}

function operate(num1, num2, operation) {
    switch(operation) {
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

equalEl.addEventListener("click", () =>{
    if(!currentNum || !prevNum) return;
    haveDot = false;
    result = operate(parseFloat(result), parseFloat(currentNum), lastOperation);
    clearCurrentNum();
    currentNumEl.innerText = result;
    currentNum = result;
    prevNum = "";
})

clearAll.addEventListener("click", () =>{
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

sound.forEach(button =>{
    button.addEventListener("click", () =>{
        makeSound();
    } )
})

function makeSound(){
    let playSound = new Audio("./sound/click.wav");
    playSound.play();
}

document.addEventListener("keydown", (e) =>{
    console.log(e.key);
    if(e.key === "." && !haveDot){
        haveDot = true;
        currentNum += e.key;
        currentNumEl.innerText = currentNum;
    }else if(e.key === "." && haveDot){
        return;
    }else if(e.key === "1" ||
        e.key === "2" || 
        e.key === "3" || 
        e.key === "4" ||
        e.key === "5" || 
        e.key === "6" || 
        e.key === "7" || 
        e.key === "8" || 
        e.key === "9" || 
        e.key === "0") {
        makeSound();
        currentNum += e.key;
        currentNumEl.innerText = currentNum;
    }else if(e.key === "+" ||
        e.key === "-" ||
        e.key === "*" ||
        e.key === "/"){
        makeSound();
        if(!currentNum) return;
        haveDot = false;
        const operationName = e.key;
        if(currentNum && prevNum && lastOperation){
        result = operate(parseFloat(result), parseFloat(currentNum), lastOperation);
        }else{
        result = parseFloat(currentNum);
    }
        clearCurrentNum(operationName);
        lastOperation = operationName;
    }else if(e.key === "=" || 
        e.key === "Enter"){
        makeSound();
        if(!currentNum || !prevNum) return;
        haveDot = false;
        result = operate(parseFloat(result), parseFloat(currentNum), lastOperation);
        clearCurrentNum();
        currentNumEl.innerText = result;
        currentNum = result;
        prevNum = "";
    }else if(e.key === "Backspace"){
        makeSound();
        if(currentNumEl.innerText === "0") return;
        currentNum = currentNumEl.innerText;
        currentNum = currentNum.slice(0,-1);
        currentNumEl.innerText = currentNum;
    }else if(e.key === "Escape"){
        makeSound();
        prevNumEl.innerText = "0";
        currentNumEl.innerText = "0";
        currentNum = "";
        prevNum = "";
        result = "";
    }
})