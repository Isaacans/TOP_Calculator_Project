let isPositive = true;
let calcInputString = "";
const calcScreen = document.getElementById('calculator_screen');
const calcBorder = document.getElementById('calculator_border');
const buttons = document.querySelectorAll('button');
const button_1 = document.getElementById('one')

calcBorder.addEventListener("click", (clickEvent) => {
    processButton(clickEvent.target.id);
    updateScreen();
});

function processButton(id) {
    switch(id) {
        case 'one':
            updateInputString(1);
            break;
        case 'two':
            updateInputString(2);
            break;
        case 'three':
            updateInputString(3);
            break;
        case 'four':
            updateInputString(4);
            break;        
        case 'five':
            updateInputString(5);
            break;    
        case 'six':
            updateInputString(6);
            break;
        case 'seven':
            updateInputString(7);
            break;    
        case 'eight':
            updateInputString(8);
            break;    
        case 'nine':
            updateInputString(9);
            break;    
        case 'zero':
            updateInputString(0);
            break;  
        case 'AC':
            updateInputString('AC')
            break;        
        case 'flip_positivity':
            flipPositivity();
            break;    
        case 'backspace':
            updateInputString('backspace');
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

function updateScreen() {
        calcScreen.textContent = calcInputString;
};

function updateInputString(input) {
    if (input === 'backspace'){
        calcInputString = calcInputString.slice(0, -1);
    } else if (input === 'AC'){
        calcInputString = '';
        isPositive = true; // To reset variable to default positive.
    } else if (calcInputString.length <= 15) {
        calcInputString += input;
    };
};

function flipPositivity() {
    if (isPositive === true) {
        calcInputString = '-' + calcInputString;
        isPositive = false;
    } else if (isPositive === false) {
        calcInputString = calcInputString.replace('-', '');
        isPositive = true;
    };
};

