let isPositive = true;
let secondEquationTerm = false;
let calcInputString = "0";
let equationTermA;
let equationTermB;
let equationOperator;
;
const calcScreen = document.getElementById('calculator_screen');
const calcBorder = document.getElementById('calculator_border');
const buttons = document.querySelectorAll('button');

calcBorder.addEventListener("click", (clickEvent) => {
    processInput(clickEvent.target.id);
    updateScreen();
});

function processInput(id) {
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
        case 'times':
        case 'minus': 
        case 'plus':
            handleOperand(id);
            break;    
        case 'equals':
            equationTermB = parseFloat(calcInputString);
            calcInputString = calculateEquation();
            break;    
    };
};

function updateScreen() {
    if (secondEquationTerm === true) {
        secondEquationTerm = false;
        return;
    }
        calcScreen.textContent = calcInputString;
};

function updateInputString(inputSelection) {
    if (inputSelection === 'backspace') { 
        if (calcInputString.length === 2) {
            if (calcInputString.indexOf('-') === -1) {
                calcInputString = calcInputString.slice(0, -1);
            } else {
                calcInputString = '0';
                isPositive = true;
            };
        } else if (calcInputString.length > 1) { // Checks to prevent 0 and '-' being removed
            calcInputString = calcInputString.slice(0, -1);
        } else {
            calcInputString = '0';
        };

    } else if (inputSelection === 'AC'){
        calcInputString = '0';
        isPositive = true; // To reset variable to default positive.

    } else if (calcInputString.length <= 15 && typeof(inputSelection) === 'number') {
        if (calcInputString.charAt(0) === '0' && calcInputString.charAt(1) === '') {
            calcInputString = inputSelection.toString();
        } else if (calcInputString.charAt(0) === '-' && calcInputString.charAt(1) === '0' && calcInputString.charAt(2) === '') {
            calcInputString = '-' + inputSelection.toString();
        } else {
            calcInputString += inputSelection;
        };

    } else if (inputSelection === 'decimal_point' && calcInputString.indexOf('.') === -1) {
        calcInputString += '.';
    };
};

function flipPositivity() {
    if (isPositive === true) {
        isPositive = false;
        calcInputString = '-' + calcInputString;
    } else if (isPositive === false) {
        isPositive = true;
        calcInputString = calcInputString.replace('-', '');
    };
};

function calculateEquation() {
    switch(equationOperator) {
        case 'divide':
            return (equationTermA / equationTermB).toString();
        case 'times':
            return (equationTermA * equationTermB).toString();
        case 'minus':
            return (equationTermA - equationTermB).toString();
        case 'plus':
            return (equationTermA + equationTermB).toString();
    };
};

function handleOperand(operatorType) {
    equationTermA = parseFloat(calcInputString);
    equationOperator = operatorType;
    secondEquationTerm = true;
    calcInputString = '0';
};