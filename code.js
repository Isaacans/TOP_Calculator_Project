let isPositive = true;
let secondEquationTerm = false;
let calcInputString = '0';
let calcOutputString = '0';
let equationTermA = '';
let equationTermB = '';
let equationOperator = '';
let lastOperator = '';

const calcScreen = document.getElementById('calculator_screen');
const calcBorder = document.getElementById('calculator_border');
const buttons = document.querySelectorAll('button');

calcBorder.addEventListener("click", (clickEvent) => {
    processUserInput(clickEvent.target.id);
    updateScreen();
});

function processUserInput(id) {
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
            processOperandInput(id);
            break;    
        case 'equals':
            processEqualsInput();
            break;    
    };
};

function updateScreen() {
    if (secondEquationTerm === true) {
        return;
    }   

    calcOutputString = parseFloat(calcInputString).toLocaleString('en-NZ', {maximumFractionDigits: 20});

    // Adds decimal point to end of string as toLocaleString removes this
    if (calcInputString.endsWith('.') && !calcOutputString.endsWith('.')){
        calcOutputString += '.';
    };
    
    calcScreen.textContent = calcOutputString;
};

function updateInputString(inputSelection) {
    if (inputSelection === 'backspace') { 
        // Want backspace to set calc output number to 0 and remove minus sign/number negativity
        if (calcInputString.length === 2) {
            if (calcInputString.indexOf('-') === -1) {
                calcInputString = calcInputString.slice(0, -1);
            } else {
                calcInputString = '0';
                isPositive = true;
            }; // Next if checks to prevent 0 and '-' being removed
        } else if (calcInputString.length > 1) { 
            calcInputString = calcInputString.slice(0, -1);
        } else {
            calcInputString = '0';
        };

    } else if (inputSelection === 'AC'){
        isPositive = true;// To reset variable to default positive.
        secondEquationTerm = false;
        calcInputString = "0";
        equationTermA = '';
        equationTermB = '';
        equationOperator = '';
        lastOperator = '';

    // Update calcInputString when numbers are pressed
    } else if (typeof(inputSelection) === 'number') {
        if (calcInputString.length >= 15) {
            return;
        };
        if (secondEquationTerm === true) {
            calcInputString = inputSelection.toString();
            secondEquationTerm = false;
            return;
        };
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
    let answer;
    switch(equationOperator) {
        case 'divide':
            answer = (equationTermA / equationTermB);
            break;
        case 'times':
            answer = (equationTermA * equationTermB);
            break;
        case 'minus':
            answer = (equationTermA - equationTermB);
            break;
        case 'plus':
            answer = (equationTermA + equationTermB);
            break;
    };
    secondEquationTerm = false;
    return answer;
};

function processOperandInput(operatorType) {
    if (equationTermA && !equationTermB) {
        processEqualsInput();
        return;
    };
    equationOperator = operatorType;
    secondEquationTerm = true;
    equationTermA = parseFloat(calcInputString);
    equationTermB = '';
};

function processEqualsInput() {
    if (!equationTermB) {
        equationTermB = parseFloat(calcInputString);
    };
    let outcome = calculateEquation();
    if (typeof(outcome) === 'number') {
        calcInputString = outcome.toString();
        equationTermA = parseFloat(calcInputString);
    };    
};