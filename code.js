let isPositive = true;
let calcInputString = "0";
const calcScreen = document.getElementById('calculator_screen');
const calcBorder = document.getElementById('calculator_border');
const buttons = document.querySelectorAll('button');

calcBorder.addEventListener("click", (clickEvent) => {
    processButton(clickEvent.target.id);
    updateScreen();
});

console.log(parseFloat("10"));
console.log(parseFloat("10.11"));
console.log(parseFloat("-10"));
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
        case 'decimal_point':
            updateInputString('decimal_point');
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
    };
};

function updateScreen() {
        calcScreen.textContent = calcInputString;
};

function updateInputString(buttonInput) {
    if (buttonInput === 'backspace') { 
        if (calcInputString.length > 1) { // Checks to prevent 0 and '-' being removed
            calcInputString = calcInputString.slice(0, -1);
        } else if (calcInputString === '-' || calcInputString === '0') {
            return;
        } else {
            calcInputString = '0';
        };
    
    } else if (buttonInput === 'AC'){
        calcInputString = '0';
        isPositive = true; // To reset variable to default positive.

    } else if (calcInputString.length <= 15 && typeof(buttonInput) === 'number') {
        if (calcInputString.charAt(0) === '0') {
            calcInputString = buttonInput.toString();
        } else if (calcInputString.charAt(0) === '-' && calcInputString.charAt(1) === '0') {
            calcInputString = '-' + buttonInput.toString();
        } else {
            calcInputString += buttonInput;
        };

    } else if (buttonInput === 'decimal_point') {
        if (calcInputString.length === 0){
            calcInputString += '0.';
        } else if (calcInputString.length === 1 && calcInputString.search('-') === -1) {
            calcInputString += '.';
        } else if (calcInputString.search('.') === -1) {
            calcInputString += '.';
        };
        calcInputString += '.';
    };
};

function flipPositivity() {
    if (isPositive === true && calcInputString !== '0') {
        calcInputString = '-' + calcInputString;
        isPositive = false;
    } else if (isPositive === false) {
        calcInputString = calcInputString.replace('-', '');
        isPositive = true;
    };
};
