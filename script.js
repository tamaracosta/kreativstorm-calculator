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

function mathOperation(){
    if(lastOperation === "*"){
        result = parseFloat(result) * parseFloat(currentNum);
    }else if(lastOperation === "+"){
        result = parseFloat(result) + parseFloat(currentNum);
    }else if(lastOperation === "-"){
        result = parseFloat(result) - parseFloat(currentNum);
    }else if(lastOperation === "/"){
        if(parseFloat(currentNum) === 0){
            alert("You can't divide by zero. Nice try though!")
            return;
        }    
        result = parseFloat(result) / parseFloat(currentNum);
    }
    result = parseFloat(result.toFixed(2));
}

equalEl.addEventListener("click", (e) =>{
    if(!currentNum || !prevNum) return;
    haveDot = false;
    mathOperation();
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