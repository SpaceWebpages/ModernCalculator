// Variables
let currentInput = ""; // Current number input
let previousInput = ""; // Previous number input
let operator = ""; // Selected operator
let result = ""; // Calculation result
let history = []; // Array for calculation history

// Update the calculator's display
function updateDisplay() {
    const output1 = document.getElementById("output");
    const output2 = document.getElementById("output2");
    output1.textContent = previousInput + " " + operator;
    output2.textContent = currentInput || ""; // Show "0" if empty

    adjustFontSize(); // Dynamically adjust font size
}

// Adjust font size dynamically for long results
function adjustFontSize() {
    const outputElement = document.getElementById("output2");
    const maxFontSize = 40; // Default size
    const minFontSize = 20; // Minimum size
    const lengthThreshold = 15; // Threshold for shrinking

    const currentLength = outputElement.textContent.length;
    if (currentLength > lengthThreshold) {
        const newFontSize = Math.max(
            minFontSize,
            maxFontSize - (currentLength - lengthThreshold) * 2
        );
        outputElement.style.fontSize = `${newFontSize}px`;
    } else {
        outputElement.style.fontSize = `${maxFontSize}px`;
    }
}

// Clear all inputs
function clearBTN() {
    currentInput = "";
    previousInput = "";
    operator = "";
    result = "";
    updateDisplay();
}

// Append a number
function appendNumber(number) {
    if (currentInput.length < 15) { // Limit input length
        currentInput += number;
        updateDisplay();
    }
}

// Set an operator
function setOperator(op) {
    if (currentInput === "" && result !== "") {
        previousInput = result; // Use result if no input
    } else if (currentInput !== "") {
        if (previousInput !== "") {
            calculate(); // Perform calculation
        } else {
            previousInput = currentInput; // Store current input
        }
    }
    currentInput = ""; // Clear current input
    operator = op;
    updateDisplay();
}

// Perform the calculation
function calculate() {
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);

    if (isNaN(num1) || isNaN(num2)) return; // Exit if invalid input

    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "x":
            result = num1 * num2;
            break;
        case "÷":
            result = num2 !== 0 ? num1 / num2 : "Error"; // Handle division by zero
            break;
        default:
            return;
    }

    // Alert if result is 20
    if (result === 20) {
        alert("Hi");
    }

    // Add calculation to history
    history.push(`${num1} ${operator} ${num2} = ${result}`);

    currentInput = result.toString();
    previousInput = "";
    operator = "";
    updateDisplay();
    updateHistory(); // Update history display
}

// Handle equals button
function handleEquals() {
    if (previousInput !== "" && currentInput !== "" && operator !== "") {
        calculate();
    }
}

// Update the history display
function updateHistory() {
    const historyContainer = document.getElementById("history");
    historyContainer.innerHTML = ""; // Clear previous history

    if (history.length === 0) {
        const noHistoryItem = document.createElement("p");
        noHistoryItem.textContent = "No history available.";
        noHistoryItem.style.color = "#aaa";
        historyContainer.appendChild(noHistoryItem);
    } else {
        history.forEach((entry) => {
            const historyItem = document.createElement("p");
            historyItem.textContent = entry;
            historyContainer.appendChild(historyItem);
        });
    }
}

// Clear the history
function clearHistory() {
    history = [];
    updateHistory();
}

// Handle keyboard input
function handleKeyboardInput(event) {
    const key = event.key;

    if (!isNaN(key)) {
        appendNumber(key); // Append number
    } else if (key === "+") {
        setOperator("+");
    } else if (key === "-") {
        setOperator("-");
    } else if (key === "*" || key === "x") {
        setOperator("x");
    } else if (key === "/" || key === "÷") {
        setOperator("÷");
    } else if (key === ".") {
        appendNumber(".");
    } else if (key === "=" || key === "Enter") {
        handleEquals(); // Perform calculation
    } else if (key === "Backspace") {
        deleteLastInput();
    } else if (key.toLowerCase() === "c") {
        clearBTN();
    }
}

// Delete last digit in input
function deleteLastInput() {
    if (currentInput !== "") {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }
}

// Add event listeners
document.getElementById("num7").onclick = () => appendNumber("7");
document.getElementById("num8").onclick = () => appendNumber("8");
document.getElementById("num9").onclick = () => appendNumber("9");
document.getElementById("num4").onclick = () => appendNumber("4");
document.getElementById("num5").onclick = () => appendNumber("5");
document.getElementById("num6").onclick = () => appendNumber("6");
document.getElementById("num1").onclick = () => appendNumber("1");
document.getElementById("num2").onclick = () => appendNumber("2");
document.getElementById("num3").onclick = () => appendNumber("3");
document.getElementById("num0").onclick = () => appendNumber("0");

// Operator Buttons
document.getElementById("add").onclick = () => setOperator("+");
document.getElementById("subtract").onclick = () => setOperator("-");
document.getElementById("multiply").onclick = () => setOperator("x");
document.getElementById("divide").onclick = () => setOperator("÷");

// Other Buttons
document.getElementById("decimal").onclick = () => appendNumber(".");
document.getElementById("clear").onclick = clearBTN;
document.getElementById("equals").onclick = handleEquals;
document.getElementById("clearHistory").onclick = clearHistory;

// Keyboard Input
document.addEventListener("keydown", handleKeyboardInput);
