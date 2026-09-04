// ==========================================
// 1. STATE VARIABLES (Global Scope)
// In Python, these would just be global variables:
// score = 0, word_bank = []
// ==========================================

// 'let' defines variables that can be reassigned later.
let score = 0;
let highscore = 0;

// In JavaScript, Arrays work like Python lists: []
let wordBank = [];
let currPoem = [];

// ==========================================
// 2. DOM SELECTION (Document Object Model)
// Think of the DOM as a tree of objects representing the HTML page.
// 'const' is like 'let', but cannot be reassigned (immutable reference).
// document.getElementById() is like querying a dictionary by key to grab an object.
// ==========================================
const scoreDisplay = document.getElementById('score-display');
const highscoreDisplay = document.getElementById('highscore-display');
const currPoemDisplay = document.getElementById('poem-display');

// ==========================================
// 3. ASYNCHRONOUS DATA FETCHING
// fetch() sends a network request to load 'words.json'.
// Since loading a file takes time, JS uses "Promises" (.then) so the browser
// doesn't freeze while waiting. In Python, this is similar to async/await or
// reading a file and calling json.loads().
// ==========================================
fetch('words.json')
    .then(response => response.json()) // Parse the incoming JSON text into a JS object (like Python dict)
    .then(data => {
        // data['words'] in Python is written as data.words in JS
        wordBank = data.words;
        
        // Start the game by loading the first word
        addWord();
    })
    .catch(error => console.error('Error loading JSON:', error)); // Equivalent to except Exception as error:

// ==========================================
// 4. HELPER FUNCTION: RANDOM ELEMENT
// Similar to Python's:
// def get_random_word():
//     if not word_bank: return ''
//     return random.choice(word_bank)
// ==========================================
function getRandomWord() {
    // Array.length is equivalent to len(wordBank)
    if (wordBank.length === 0) return '';

    // Math.random() returns a float in [0, 1) (like Python's random.random())
    // Math.floor() rounds down (like Python's // or math.floor())
    const randomIndex = Math.floor(Math.random() * wordBank.length);
    return wordBank[randomIndex];
}

// ==========================================
// 5. GAME LOGIC: ADD WORD & UPDATE DISPLAY
// ==========================================
function addWord() {
    const newWord = getRandomWord();

    if (newWord) {
        // .push() is the JavaScript equivalent of Python's list.append()
        currPoem.push(newWord);

        // .join(' ') works just like Python's ' '.join(currPoem)
        // .textContent sets the visible text inside the HTML paragraph element
        currPoemDisplay.textContent = currPoem.join(' ');
    }
    
    // Increment score (score += 1)
    score += 1;

    // Standard conditional check for high score
    if (score > highscore) {
        highscore = score;
    }

    // Push updated numerical values to the screen
    scoreDisplay.textContent = score;
    highscoreDisplay.textContent = highscore;
}

// ==========================================
// 6. GAME LOGIC: RESET / CLEAR
// ==========================================
function clearPoem() {
    // Reset list and counter
    currPoem = [];
    score = 0;

    // Clear and re-render UI elements
    currPoemDisplay.textContent = '';
    scoreDisplay.textContent = score;

    // Immediately start the next round with a fresh word
    addWord();
}