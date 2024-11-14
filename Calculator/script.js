const display = document.getElementById('input');
const buttons = document.querySelectorAll('button');
let currentInput = '';  // To store the current input
let operator = '';      // To store the operator
let previousInput = ''; // To store the previous input

// Function to update the display
function updateDisplay() {
    display.textContent = currentInput;  // Just show the current input on the display
}

// Button click event listener
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const buttonValue = event.target.textContent;

        // Handle number and decimal input
        if ((buttonValue >= '0' && buttonValue <= '9') || buttonValue === '.') {
            currentInput += buttonValue;  // Add the number or decimal point to the input
            updateDisplay();  // Update the display
        }

        // Handle operator button clicks (+, -, *, /)
        else if (buttonValue === '+' || buttonValue === '-' || buttonValue === '*' || buttonValue === '/') {
            if (currentInput !== '') {
                previousInput = currentInput;  // Store the current input in previousInput
                currentInput = '';  // Clear the current input for the next number
                operator = buttonValue;  // Store the operator
            }
        }

        // Handle equals button click (=)
        else if (buttonValue === '=') {
            if (previousInput !== '' && currentInput !== '') {
                currentInput = operate(previousInput, currentInput, operator);  // Perform the calculation
                updateDisplay();  // Show the result in the display
                previousInput = '';  // Clear previousInput after calculation
                operator = '';  // Clear the operator after calculation
            }
        }

        // Handle clear button click (C)
        else if (buttonValue === 'C') {
            currentInput = '';  // Clear the current input
            previousInput = ''; // Clear the previous input
            operator = '';      // Clear the operator
            updateDisplay();    // Update the display
        }

        // Handle percentage button click (%)
        else if (buttonValue === '%') {
            if (currentInput !== '') {
                currentInput = (parseFloat(currentInput) / 100).toString();  // Convert to percentage
                updateDisplay();  // Update the display
            }
        }
    });
});

// Function to perform the calculation based on the operator
function operate(num1, num2, operator) {
    num1 = parseFloat(num1);  // Convert the string to number
    num2 = parseFloat(num2);  // Convert the string to number

    // Perform the calculation based on the operator
    if (operator === '+') {
        return (num1 + num2).toString();  // Return the sum
    } else if (operator === '-') {
        return (num1 - num2).toString();  // Return the difference
    } else if (operator === '*') {
        return (num1 * num2).toString();  // Return the product
    } else if (operator === '/') {
        if (num2 !== 0) {
            return (num1 / num2).toString();  // Return the quotient
        } else {
            return 'Error';  // Return error if division by zero
        }
    }
}
