const guessField = document.querySelector('#guessField');
const submitButton = document.querySelector('#sub');
const guessesDisplay = document.querySelector('.guesses');
const lastResultDisplay = document.querySelector('.lastResult');
const lowOrHiDisplay = document.querySelector('.loworHi');

// Game variables
let randomNumber = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
let attemptsLeft = 5; // Total attempts
let guesses = []; // Array to track guesses

// Function to reset the game
function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1; // Generate a new random number
    attemptsLeft = 5; // Reset attempts
    guesses = []; // Clear guesses
    guessesDisplay.textContent = ''; // Clear previous guesses
    lastResultDisplay.textContent = attemptsLeft; // Reset attempts left
    lowOrHiDisplay.textContent = ''; // Clear hints
    guessField.value = ''; // Clear input field
    guessField.disabled = false; // Enable input
    submitButton.value = 'Submit guess'; // Reset button text
    submitButton.style.backgroundColor = ''; // Reset button color
}

// Function to handle the user's guess
function handleGuess(event) {
    event.preventDefault(); // Prevent form submission

    const userGuess = Number(guessField.value); // Get the user's guess
    guessField.value = ''; // Clear input field

    // Validate the input
    if (!userGuess || userGuess < 1 || userGuess > 100) {
        lowOrHiDisplay.textContent = 'Please enter a number between 1 and 100!';
        return;
    }

    // Add the guess to the list of guesses
    guesses.push(userGuess);
    guessesDisplay.textContent = `Previous guesses: ${guesses.join(', ')}`;

    // Check if the guess is correct
    if (userGuess === randomNumber) {
        lowOrHiDisplay.textContent = 'Congratulations! You guessed the correct number!';
        lowOrHiDisplay.style.color = 'green';
        guessField.disabled = true; // Disable input field
        submitButton.value = 'Restart Game';
        submitButton.style.backgroundColor = 'green';
        submitButton.onclick = resetGame; // Set reset functionality
        return;
    }

    // Check if attempts are remaining
    attemptsLeft--;
    lastResultDisplay.textContent = attemptsLeft;

    if (attemptsLeft === 0) {
        lowOrHiDisplay.textContent = `Game Over! The number was ${randomNumber}.`;
        lowOrHiDisplay.style.color = 'red';
        guessField.disabled = true; // Disable input field
        submitButton.value = 'Restart Game';
        submitButton.style.backgroundColor = 'red';
        submitButton.onclick = resetGame; // Set reset functionality
        return;
    }

    // Provide hints if the guess is wrong
    if (userGuess < randomNumber) {
        lowOrHiDisplay.textContent = 'Too low! Try a higher number.';
        lowOrHiDisplay.style.color = 'blue';
    } else {
        lowOrHiDisplay.textContent = 'Too high! Try a lower number.';
        lowOrHiDisplay.style.color = 'blue';
    }
}

// Event listener for the submit button
submitButton.addEventListener('click', handleGuess);
