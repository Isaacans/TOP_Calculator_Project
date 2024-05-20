let isPositive = true;
let calcOutputString = "";
const calcScreen = document.getElementById('calculator_screen');
const calcBorder = document.getElementById('calculator_border');
const buttons = document.querySelectorAll('button');
const button_1 = document.getElementById('one')

calcBorder.addEventListener("click", (clickEvent) => {
    console.log(clickEvent.target.id);
    processButton(clickEvent.target.id);
    updateScreen();
});

console.log(button_1);

function processButton(id) {
    switch(id) {
        case 'one':
            calcOutputString += 1;
            break;
        case 'two':
            calcOutputString += 2;
            break;
        case 'three':
            calcOutputString += 3;
            break;
        case 'four':
            calcOutputString += 4;
            break;        
        case 'five':
            calcOutputString += 5;
            break;    
        case 'six':
            calcOutputString += 6;
            break;
        case 'seven':
            calcOutputString += 7;
            break;    
        case 'eight':
            calcOutputString += 8;
            break;    
        case 'nine':
            calcOutputString += 9;
            break;    
        case 'zero':
            calcOutputString += 0;
            break;  
        case 'AC':
            calcOutputString = '';
            isPositive = true;
            break;        
        case 'flip_positivity':
            flipPositivity();
            break;    
        case 'backspace':
            calcOutputString = calcOutputString.slice(0, -1);
            break;    
        case 'divide':
            console.log(id);
            break;    
        case 'times':
            console.log(id);
            break;    
        case 'minus':
            console.log(id);
            break;    
        case 'plus':
            console.log(id);
            break;    
        case 'equals':
            console.log(id);
            break;    
        case 'decimal_point':
            console.log(id);
            break;
    };
};

function updateScreen(input) {
    if (calcOutputString.length <= 15) {
        calcScreen.textContent = calcOutputString;
    };
};

function flipPositivity() {
    if (isPositive === true) {
        calcOutputString = '-' + calcOutputString;
        isPositive = false;
    } else if (isPositive === false) {
        calcOutputString = calcOutputString.replace('-', '');
        isPositive = true;
    };
};

