// Create the main container element for the game
const container = document.createElement('div');
container.classList.add('container');

// Create a heading element (h1) for the game title
const h1 = document.createElement('h1');
h1.textContent = "SUDOKU GAME";
container.appendChild(h1);

// Create a container element for the Sudoku board
const board = document.createElement('div');
board.id = "board";

// Initialize a counter to keep track of input element IDs
let count = 0;
// Loop to create 3 rows for the Sudoku board
for (let rowNumber = 1; rowNumber <= 3; ++rowNumber) {
    const row = document.createElement('div');
    row.id = `row${rowNumber}`;
    // Loop to create 3 boxes within each row
    for (let box = 0; box < 3; ++box) {
        const square = document.createElement('div');
        square.id = 'square' + ((3 * rowNumber) - 2 + box);
        square.classList.add('square');
        // Create the inner HTML structure for each square, containing 9 input elements
        square.innerHTML = "<div class='cell'><input type='text' id='" + (++count) + "' class='input'></div>" +
            "<div class='cell'><input type='text' id='" + (++count) + "' class='input'></div>" +
            "<div class='cell'><input type='text' id='" + (++count) + "' class='input'></div>" +
            "<div class='cell'><input type='text' id='" + (++count) + "' class='input'></div>" +
            "<div class='cell'><input type='text' id='" + (++count) + "' class='input'></div>" +
            "<div class='cell'><input type='text' id='" + (++count) + "' class='input'></div>" +
            "<div class='cell'><input type='text' id='" + (++count) + "' class='input'></div>" +
            "<div class='cell'><input type='text' id='" + (++count) + "' class='input'></div>" +
            "<div class='cell'><input type='text' id='" + (++count) + "' class='input'></div>";
        row.appendChild(square);
    }
    board.appendChild(row);
}
container.appendChild(board);

// Function to create and configure a button
// Function to create a button with specified ID, text, and click event handler
function createButton(id, text, clickHandler) {
    const button = document.createElement('button');
    button.type = "button";
    button.id = id;
    button.textContent = text;
    button.addEventListener('click', clickHandler); // Add click event listener
    return button;
}

// Create buttons for Start, Restart, and Solve actions
let startBtn = createButton('start', 'START', Start);

let restartBtn = createButton('restart', 'NEW GAME', Restart);

let solveBtn = createButton('solve', 'SOLVE', Solve);

container.appendChild(startBtn);
container.appendChild(restartBtn);
container.appendChild(solveBtn);

const gameType = document.createElement('div');
gameType.id = "game_type";
// Define the HTML content for game type selection (difficulty levels and timer)
gameType.innerHTML = `<h3>CHOOSE LEVEL:</h3>
        <label><input type="radio" id="easy" class="label" name="diff_level" checked> Easy</label>
        <label><input type="radio" id="medium" class="label" name="diff_level"> Medium</label>
        <label><input type="radio" id="hard" class="label" name="diff_level"> Hard</label>
        <h3>TIME LIMIT :</h3>
        <label><input type="radio" id="time1" class="label" name="time"><span id="time1_min">03</span>:<span
                id="time1_sec">00</span></label>
        <label><input type="radio" id="time2" class="label" name="time" checked><span id="time2_min">05</span>:<span
                id="time2_sec">00</span></label>
        <label><input type="radio" id="time3" class="label" name="time"> <span id="time3_min">10</span>:<span
                id="time3_sec">00</span></label>

        <button type="button" id="help" onclick="help()">HOW TO PLAY</button>`;

container.appendChild(gameType);

const live = document.createElement('div');
live.id = 'lives';
live.innerHTML = `YOU HAVE ONLY <span id="rem_live">3</span> LIVES`;

const timerDiv = document.createElement('div');
timerDiv.id = 'timer';
timerDiv.innerHTML = `Time Remains: <span id="time_min">00</span>:<span id="time_sec">00</span>`;

container.appendChild(live);
container.appendChild(timerDiv);

document.body.appendChild(container);