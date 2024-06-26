let isPositive = true;
let secondEquationTerm = false;
let calcInputString = '0';
let calcOutputString = '0';
let equationTermA = '';
let equationTermB = '';
let equationOperator = '';
let lastOperator = '';
let equationCompleted = false;

const calcScreenContentMaxLength = 17;
const calcInputStringMaxLength = calcScreenContentMaxLength + 4;
const calcScreen = document.getElementById('calculator-screen');
const calcBorder = document.getElementById('calculator-border');
const buttons = document.querySelectorAll('button');

// To detect user input on button clicks via eventListener. Calls all functions needed in response
calcBorder.addEventListener("click", (clickEvent) => {
    processUserInput(clickEvent.target.id);
    updateScreen();
});

// Event listener to detect user input via keyboard. Calls all functions needed in response
document.addEventListener("keydown", (keyDownEvent) => {
    processKeyboardInput(keyDownEvent.key);
    updateScreen();
});

function processKeyboardInput(key) {
    switch(key) {
        case '1':
            updateInputString(1);
            break;
        case '2':
            updateInputString(2);
            break;
        case '3':
            updateInputString(3);
            break;
        case '4':
            updateInputString(4);
            break;        
        case '5':
            updateInputString(5);
            break;    
        case '6':
            updateInputString(6);
            break;
        case '7':
            updateInputString(7);
            break;    
        case '8':
            updateInputString(8);
            break;    
        case '9':
            updateInputString(9);
            break;    
        case '0':
            updateInputString(0);
            break;  
        case 'Escape':
            updateInputString('AC')
            break;        
        case '-':
            flipPositivity();
            break;  
        case 'Backspace':
            updateInputString('backspace');
            break;    
        case '.':
            updateInputString('decimal-point');
            break;
        case '/':
            processOperandInput('divide');
            break;  
        case '*':
            processOperandInput('times');
            break;  
        case '-': 
            processOperandInput('minus');
            break;  
        case '+':
            processOperandInput('plus');
            break;    
        case '=':
        case 'Enter':
            processEqualsInput();
            break;    
    };
};

function processUserInput(targetID) {
    switch(targetID) {
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
        case 'flip-positivity':
            flipPositivity();
            break;    
        case 'backspace':
            updateInputString('backspace');
            break;    
        case 'decimal-point':
            updateInputString('decimal-point');
            break;
        case 'divide':
        case 'times':
        case 'minus': 
        case 'plus':
            processOperandInput(targetID);
            break;    
        case 'equals':
            processEqualsInput();
            break;    
    };
};

function updateScreen() {
    if (secondEquationTerm === true) {
        return;
    };   

    // Use toLocaleString to add comma to every thousand
    calcOutputString = parseInt(calcInputString).toLocaleString();
    
    // Adds back the decimal point and any 0s after it, as toLocalString removes these
    if (calcInputString.includes('.')){
        calcOutputString += calcInputString.slice(calcInputString.indexOf('.'));
    };
    
    // Limit output length to prevent calc screen overflow
    if (calcOutputString.replace('-', '').length > calcScreenContentMaxLength) {
        
        // Remove minus sign as this should be separate from calcScreenMaxContentLength
        let isNegative = calcOutputString.includes('-');
        if (isNegative) {
            calcOutputString = calcOutputString.replace('-', '');
        };

        // Reduces the length of longer numbers by rounding the decimal places
        if (calcOutputString.includes('.') && !calcOutputString.endsWith('.')) {
            let i = calcOutputString.replace(/,/g, '').slice(calcOutputString.replace(/,/g, '').indexOf('.')).length - 2;
            
            if (i < 1) {
                i = 1;
            };

            while (i > 0 && (calcOutputString.length) > calcScreenContentMaxLength) {
                calcOutputString = calcOutputString.replace(/,/g, '');
                calcOutputString = parseFloat(calcOutputString);
                calcOutputString = (Math.round(calcOutputString * (10**i)) / 10**i).toString();
                calcOutputString = calcOutputString.toString()
                calcOutputString = parseInt(calcOutputString).toLocaleString() + calcOutputString.slice(calcOutputString.indexOf('.'));
                i--;
            };    
        };

        // Changes number output to e notation if calcScreenMaxContentLength is exceeded
        let i = calcScreenContentMaxLength;
        while (calcOutputString.length > calcScreenContentMaxLength) {
            calcOutputString = parseFloat(calcOutputString.replace(/,/g, ''));
            calcOutputString = calcOutputString.toExponential(i);
            

            // To avoid calc screen number ending unnecessarily with e+0
            if (calcOutputString[calcOutputString.indexOf('e+') + 2] === '0') {
                calcOutputString = calcOutputString.slice(0, calcOutputString.indexOf('e+'));
            };
            
            // To avoid calc screen number having unnecessary 0s preceding e+n
            if (calcOutputString.includes('e+') && calcOutputString[calcOutputString.indexOf('e+') - 1] === '0') {
                let exponentialAmount = calcOutputString.slice(calcOutputString.indexOf('e+'))
                let numberAmount = calcOutputString.slice(0, calcOutputString.indexOf('e+'))
                for (let i = numberAmount.length - 1; numberAmount[i] === '0' || numberAmount[i] === '.'; i--) {
                    numberAmount = numberAmount.slice(0, -1);
                };
                calcOutputString = numberAmount + exponentialAmount;
            };

            i--;
        };

        // Add back minus sign after removing for calcScreenMaxContentLength restrictions
        if (isNegative) {
            calcOutputString = '-' + calcOutputString;
        };
    };
    
    if (!calcOutputString.includes('-') && isPositive === false) {
        calcOutputString = '-' + calcOutputString;
    };

    calcScreen.textContent = calcOutputString;
};

function updateInputString(inputSelection) {
    if (inputSelection === 'backspace') { 
        // Want backspace to set calc output number to 0 and remove minus sign/number negativity
        equationCompleted = false;

        // Checks to prevent 0 and '-' being removed
        if (calcInputString.length === 2) {
            if (calcInputString.indexOf('-') === -1) {
                calcInputString = calcInputString.slice(0, -1);
            } else {
                calcInputString = '0';
                isPositive = true;
            };         
        } else if (calcInputString.length > 1) { 
            calcInputString = calcInputString.slice(0, -1);
        // After backspace all characters the calcInputString resets to 0 instead of going blank
        } else {
            calcInputString = '0';
        };

        // Holds the new number created by using backspace and store it for next equation
        if (secondEquationTerm) {
            secondEquationTerm = false;
            updateScreen();
            equationTermA = parseFloat(calcInputString);
            secondEquationTerm = true;
        };

    } else if (inputSelection === 'AC'){
        isPositive = true;// To reset variable to default positive.
        secondEquationTerm = false;
        calcInputString = "0";
        equationTermA = '';
        equationTermB = '';
        equationOperator = '';
        lastOperator = '';
        equationCompleted = false;

    // Update calcInputString when numbers are pressed
    } else if (typeof(inputSelection) === 'number') {
        if (checkInputLengthExceeded()) {
            return;
        };
        
        // Overwrites calcInputString with new number input after equation is evaluated
        if (secondEquationTerm === true || equationCompleted === true) {
            isPositive = true;
            calcInputString = inputSelection.toString();
            equationCompleted = false
            secondEquationTerm = false;
            return;
        };

        // Number should not start with 0 unless it is followed by a decimal point
        if (calcInputString.charAt(0) === '0' && calcInputString.charAt(1) === '') {
            calcInputString = inputSelection.toString();
        } else if (calcInputString.charAt(0) === '-' && calcInputString.charAt(1) === '0' && calcInputString.charAt(2) === '') {
            calcInputString = '-' + inputSelection.toString();
        } else {
            calcInputString += inputSelection;
        };

    } else if (inputSelection === 'decimal-point') {
        if (checkInputLengthExceeded()) {
            return;
        };
        
        // To handle first input after equation evaluation being the decimal point
        if (secondEquationTerm === true || equationCompleted === true) {
            isPositive = true;
            calcInputString = '0.';
            equationCompleted = false
            secondEquationTerm = false;
            return;
        };

        // To prevent more than 1 decimal from being added to input string
        if (calcInputString.indexOf('.') !== -1) {
            return;
        };

        calcInputString += '.';

    };
};

function flipPositivity() {
    if (isPositive === true) {
        if (!calcInputString.includes('-')) {
            calcInputString = '-' + calcInputString;
        };
        isPositive = false;
    } else if (isPositive === false) {
        calcInputString = calcInputString.replace(/-/g, '');
        isPositive = true;
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
    equationTermA = '';
    secondEquationTerm = false;
    isPositive = true;
    return answer;
};

function processOperandInput(operatorType) {
    
    if (equationTermA && !equationTermB && secondEquationTerm === false ) {
        processEqualsInput();
        updateScreen();
        equationOperator = operatorType;
        equationTermB = '';
        equationTermA = parseFloat(calcInputString);
        secondEquationTerm = true;
        return;
    };
    
    secondEquationTerm = true;
    equationOperator = operatorType;
    equationTermA = parseFloat(calcInputString);
    equationTermB = '';
};

function processEqualsInput() {
    if (!equationTermB) {
        equationTermB = parseFloat(calcInputString);
    };
    
    if (equationTermA === '') {
        equationTermA = parseFloat(calcInputString);
    };

    let outcome = calculateEquation();
    if (typeof(outcome) === 'number') {
        calcInputString = outcome.toString();
    };    
    equationCompleted = true;
};

function checkInputLengthExceeded() {
    // Condition 'secondEquationTerm === false' enables equationTermB to be entered when max length reached
    if (calcInputString.length >= calcInputStringMaxLength && secondEquationTerm === false) {
        if (calcInputString.includes('-') && calcInputString.length >= calcInputStringMaxLength + 1) {
            return true;
        } else if (!calcInputString.includes('-')) {
            return true;
        }
    };
    return false;
};