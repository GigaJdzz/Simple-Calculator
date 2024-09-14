let equation = [];
let operations = ["+", "-", "*", "/"];

function mul_div_operations() {
    let tmp = 0;
    let equation_div_mul = [];
    let i = 0;
    while (i < equation.length) {
        if (equation[i] !== "*" && equation[i] !== "/") {
            equation_div_mul.push(equation[i]);
        } else {
            tmp = equation_div_mul.pop();
            if (equation[i] === "*") {      
                tmp = parseFloat(tmp) * parseFloat(equation[i + 1]);
            } else {
                tmp = parseFloat(tmp) / parseFloat(equation[i + 1]);
            }
            i++;
            equation_div_mul.push(tmp.toString());
        }
        i++;
    }
    return equation_div_mul;
}

function add_sub_operations(equation_div_mul) {
    if (equation_div_mul.length === 0) {
        return 0;
    }
    let i = 1;
    let res = parseFloat(equation_div_mul[0]);
    while (i < equation_div_mul.length - 1) {
        if (equation_div_mul[i] === "+"){
            res += parseFloat(equation_div_mul[i + 1]);
            i++;
        } else if (equation_div_mul[i] === "-") {
            res -= parseFloat(equation_div_mul[i + 1]);
            i++;
        }
        i++;
    }
    return res;
}


function calculate() {
    let equation_partie1 = mul_div_operations();
    let res = add_sub_operations(equation_partie1);
    return res.toString();

}

function screenDisplay() {
    let screen = document.querySelector('.screen p');
    if (!screen) {
        console.error('Paragraph element not found inside .screen.');
        return;
    }
    let buttons = document.querySelectorAll('.number, .operation');
    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            addButtonValue(button, screen);
        });
    });
}


function addButtonValue(button, screen) {
    let value = button.textContent;
    if (value === "=") {
        let res = calculate();
        screen.textContent = res;
        equation = [res.toString()];
    } else if (value === "C") {
        screen.textContent = "";
        equation = [];
    } else if (operations.includes(value)){
        screen.textContent += value;
        equation.push(value);
    } else {
        screen.textContent += value;
        if (equation.length === 0 || operations.includes(equation[equation.length - 1])) {
            equation.push(value);
        } else {    
            equation[equation.length - 1] += value;
        }
    }
    console.log('Button pressed:', value);
}

document.addEventListener("DOMContentLoaded", screenDisplay);
