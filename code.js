let isPositive = true;
let secondEquationTerm = false;
let calcInputString = "0";
let equationTermA = '';
let equationTermB = '';
let equationOperator = '';
let lastOperator = '';

let showClear = false;
// let equationDone = false;

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
            equationTermB = parseFloat(calcInputString);
            calcInputString = calculateEquation();
            equationTermA = '';
            equationTermB = '';
            showClear = true;
            break;    
    };
};

function updateScreen() {
    if (secondEquationTerm === true) {
        secondEquationTerm = false;
        return;
    }   

    let calcOutputString = parseFloat(calcInputString).toLocaleString('en-NZ', {maximumFractionDigits: 20});

    if (showClear === true) {
        showClear = false;
        updateInputString('AC');
    };

    // Adds decimal point to end of string as toLocaleString removes this
    if (calcInputString.endsWith('.') && !calcOutputString.endsWith('.')){
        calcOutputString += '.';
    };
    
    calcScreen.textContent = calcOutputString;
};

function updateInputString(inputSelection) {
    // Entering number after equal is pressed starts a new equation
    // if (equationDone === true && typeof(inputSelection) === 'number') {
    //     if (isPositive) {
    //         calcInputString = inputSelection.toString();
    //     } else {
    //         calcInputString = '-' + inputSelection;
    //     }
        
    //     equationDone = false;
    //     return;
    // };
    
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
        isPositive = true;
        secondEquationTerm = false;
        calcInputString = "0";
        equationTermA = '';
        equationTermB = '';
        equationOperator = '';
        lastOperator = '';
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
    let answer;
    switch(equationOperator) {
        case 'divide':
            answer = (equationTermA / equationTermB).toString();
            break;
        case 'times':
            answer = (equationTermA * equationTermB).toString();
            break;
        case 'minus':
            answer = (equationTermA - equationTermB).toString();
            break;
        case 'plus':
            answer = (equationTermA + equationTermB).toString();
            break;
    };
    equationTermA = '';
    return answer;
};

function processOperandInput(operatorType) {
    if (equationTermA !== '') {
        equationTermB = parseFloat(calcInputString);
        equationOperator = operatorType;
        calcInputString = calculateEquation();
        secondEquationTerm = true;
        return;
    } else {
        lastOperator = operatorType;
    };

    equationTermA = parseFloat(calcInputString);
    equationOperator = operatorType;
    secondEquationTerm = true;
    calcInputString = '0';
    isPositive = true;
};