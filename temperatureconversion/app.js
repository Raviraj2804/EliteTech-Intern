let celsiusInput = document.querySelector('#celsius > input');
let fahrenheitInput = document.querySelector('#fahrenheit > input');
let kelvinInput = document.querySelector('#kelvin > input');
let btn = document.querySelector('.button button');

let isUpdating = false; // Prevent circular updates

// Helper: Round a number to 2 decimal places
function roundNumber(number) {
    return Math.round(number * 100) / 100;
}

// Helper: Validate input and perform conversion
function validateAndConvert(value, callback) {
    if (isNaN(value)) {
        clearInputs();
    } else {
        callback(value);
    }
}

// Helper: Clear all input fields
function clearInputs() {
    celsiusInput.value = "";
    fahrenheitInput.value = "";
    kelvinInput.value = "";
}

// Event listener: Celsius to Fahrenheit and Kelvin
celsiusInput.addEventListener('input', debounce(() => {
    if (isUpdating) return;
    isUpdating = true;
    validateAndConvert(parseFloat(celsiusInput.value), (cTemp) => {
        fahrenheitInput.value = roundNumber((cTemp * (9 / 5)) + 32);
        kelvinInput.value = roundNumber(cTemp + 273.15);
    });
    isUpdating = false;
}));

// Event listener: Fahrenheit to Celsius and Kelvin
fahrenheitInput.addEventListener('input', debounce(() => {
    if (isUpdating) return;
    isUpdating = true;
    validateAndConvert(parseFloat(fahrenheitInput.value), (fTemp) => {
        celsiusInput.value = roundNumber((fTemp - 32) * (5 / 9));
        kelvinInput.value = roundNumber(((fTemp - 32) * (5 / 9)) + 273.15);
    });
    isUpdating = false;
}));

// Event listener: Kelvin to Celsius and Fahrenheit
kelvinInput.addEventListener('input', debounce(() => {
    if (isUpdating) return;
    isUpdating = true;
    validateAndConvert(parseFloat(kelvinInput.value), (kTemp) => {
        celsiusInput.value = roundNumber(kTemp - 273.15);
        fahrenheitInput.value = roundNumber(((kTemp - 273.15) * (9 / 5)) + 32);
    });
    isUpdating = false;
}));

// Event listener: Clear button
btn.addEventListener('click', () => {
    clearInputs();
    btn.textContent = "Cleared!";
    setTimeout(() => (btn.textContent = "All Clear"), 1000);
});

// Helper: Debounce to improve performance
function debounce(callback, delay = 300) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback(...args), delay);
    };
}
