// Function to display instructions on how to play Sudoku
function help() {
    // Opens the provided URL in a new tab/window
    window.open(
        "https://sudoku.com/how-to-play/sudoku-rules-for-complete-beginners/", "_blank");
}

// Global variables to store difficulty level and chosen board index
let level;
let chosen;

// easy_level board create
// Easy level board data (predefined boards)
easy_board = ['2-5---7--45---9----2-6-81----9---8567-------2418---2----43-7-1----1---85--6---7-8',
    '----35-86-1-9-7-----269----54------------527-9--75----7-6---3-----2-----56---2-14',
    '3-549-6----396--81-5-2--1494-276-1-39---583-46-1549--7-6-1-824558-7-3-924---7-3-6',
    '47----3-------179--4-93--5----6---7-48---------2716-34-9----6----6--2381---54--1-',
    '-2--18573-31--5-96---16----5--4-26--97--86--------98--1-6--79--2-5---8144-9-7---1'
];
// Solved versions of easy level boards (for comparison in win/lose check)
easy = ['215986734452869371527648193379124856781543692418937265864357219693172485936521748',
    '129735486213967854342691578543869127498315276981754632786421359675248193567832914',
    '315492678723964581857236149482765193916258374631549827967138245584713692429871356',
    '476285319523861794148932657123649578481397265952716834895137624976452381763548219',
    '429618573831245796382164957537492618974186325761259843186537942265793814459378621'];


//medium level board create
medium = ['876345291982754163417638529493712568135826947359271684251968473746319825682594137',
    '834615279152793468921546387512879346634258791463987125796342581978614235857123469',
    '695138472243761589817356924428975361796854213532149687137264598851923476649782315',
    '184936257623498715372561849259847136491375682514928763673521894758162439986347215',
    '439671258825764193316582947612583497741239865924176358578429613396185742857934261'];
// Solved versions of medium level boards (for comparison in win/lose check)
medium_board = ['--6----9---75-1---1------9-9-7-25-8-3-----4-3-92-1-8-2------7---6-19--5-8----1--',
    '------27----793--892-5-63--5--87-3---34-5-79---3-87--5--63-2-819--614----57------',
    '6-5-384--2----1--9-1----9-------53--7--8-4--3--21-------7----9-8--9----6--978-3-5',
    '-8493--576--4----5---------2--84----4-1-7-6-2----28--3---------7----2--998--4721-',
    '43--7-2---2----1-----5--9-------349-741---865-241-------8--9-----6----4---7-3--61'];


//hard level board create
hard_board = ['---789-----75-8-4---38-----8---1---6---7-9---2---7---1-----61---5-3-42-----439---',
    '-6------2---9-83----6--3-79----368---2-----4---461----75-8--4----51-7---2------8-',
    '-8-------4---15--3---69-----2-73-1----9-----2-6----------19--875--9-2-1--2-835---',
    '----578------3--19---3---75-5-2-8--4------6---1-7-24---7----6----142---3---9--3--',
    '--346-5-------------9-4-8--5-9---18----4-3--7-------7--4--------9--81--6-3-71----'];
// Solved versions of hard level boards (for comparison in win/lose check)
hard = ['165789432297518346973821654847312596463729158284675931923546178851364297615439782',
    '861794532617948325156283479492536871928365147784619253753812496345127968239574681',
    '187256349428715963534691872924738156619483572861247395356194287573962418729835641',
    '143657892526738419984361275956238174843591627315782469872149635791426583267954318',
    '783461592318627954179246835569732184625493817246358971142958673497581326835719264'];


// Function to start the game
function Start() {
    // Disable clicking on label elements (presumably used for difficulty selection)
    for (let i = 0; i < 6; i++) {
        document.getElementsByClassName("label")[i].setAttribute("onclick", "return false;");
    }
    // Start the timer (function not shown here)
    timer();

    // Check which difficulty level is selected
    //easy game
    if (document.getElementById("easy").checked) {
        random("easy", easy_board);
    }

    //medium game
    else if (document.getElementById("medium").checked) {
        random("medium", medium_board);
    }

//hard game
    else if (document.getElementById("hard").checked) {
        random("hard", hard_board);
    }
// Remove the onclick attribute from the start button to prevent multiple starts
    document.getElementById("start").removeAttribute("onclick");
}

// Function to choose a random board and populate the grid
function random(levels, board) {
    level = levels;
    // Generate a random number between 0 and 4 (inclusive) to choose a board from the provided array
    const random = Math.floor(Math.random() * 5);
    chosen = random;
    for (let i = 0; i < 81; i++) {
        if (board[random][i] !== '-') {
            document.getElementById((i + 1).toString()).value = board[random][i];
            // Make the input element read-only for these pre-filled cells
            document.getElementById((i + 1).toString()).readOnly = true;
        }
    }
}

// Function to check if the game is won or lost (called periodically)
//check answer
const id = setInterval(() => {
    // Check the level to determine which solved board data to use for comparison
    if (level === "easy") {
        winORLose(easy);
    } else if (level === "medium") {
        winORLose(medium);
    } else {
        winORLose(hard);
    }
}, 500); // Call the function every 500 milliseconds

function winORLose(levels) {
    if (document.activeElement.className === "input") {
        if ((document.getElementById(document.activeElement.id).value === levels[chosen][document.activeElement.id - 1]) || (document.getElementById(document.activeElement.id).value === '')) {
            for (let i = 0; i < 81; i++) {
                if (i === 80 && document.getElementById((81).toString()).value !== '') {
                    alert("you did it, you win !! congratulation... play again to win again.");
                    clearInterval(id);
                    window.location.reload(); // Reload the page to start a new game
                } else if (document.getElementById((i + 1).toString()).value === '') {
                    break;
                }
            }
        } else {
            if (document.getElementById("rem_live").innerHTML == 1) {
                document.getElementById("rem_live").innerHTML == 0;
                alert("you lost!!!");
                document.activeElement.value = '';
                window.location.reload();

            } else {
                alert("Wrong number, you have lost one life!!");
                document.getElementById("rem_live").innerHTML = document.getElementById("rem_live").innerHTML - 1;
                document.activeElement.value = '';
            }
        }
    }
}

// Function to display the solved board
//answer
function Solve(){
    // Check the level and assign the corresponding solved board data
    if(level==="easy"){
        assign(easy);
    }
    else if(level==="medium"){
        assign(medium);
    }
    else if(level==="hard"){
        assign(hard);
    }
    else{
        alert("first choose the game and start it !!");
    }
}

// Function to fill the grid with the solved board data
function assign(board){
    for(let i=0;i<81;i++)
        document.getElementById((i+1).toString()).value=board[chosen][i];
}

// Function to restart the game
//new game
function Restart(){
    for(let i=0;i<81;i++){
        document.getElementById((i+1).toString()).value='';
    }
    Start();// Call the Start function to begin a new game
}

// Function to handle the timer functionality
//timer
function timer(){
    // Check which timer radio button is selected and update the timer display accordingly
    if(document.getElementById("time1").checked===true){
        document.getElementById("time_min").innerHTML="0"+(document.getElementById("time1_min").innerHTML-1).toString();
        document.getElementById("time_sec").innerHTML='59';
    }

    else if(document.getElementById("time2").checked===true){
        document.getElementById("time_min").innerHTML="0"+(document.getElementById("time2_min").innerHTML-1).toString();
        document.getElementById("time_sec").innerHTML='59';
    }
    else{
        document.getElementById("time_min").innerHTML="0"+(document.getElementById("time3_min").innerHTML-1).toString();
        document.getElementById("time_sec").innerHTML='59';
    }

    // Set interval to decrement seconds
    setInterval(() => {
        if(document.getElementById("time_sec").innerHTML==='00'){
            document.getElementById("time_sec").innerHTML="59";
        }
        else{
            if(parseInt(document.getElementById("time_sec").innerHTML)<=10){
                document.getElementById("time_sec").innerHTML="0"+(document.getElementById("time_sec").innerHTML-1).toString();
            }
            else{
                document.getElementById("time_sec").innerHTML=document.getElementById("time_sec").innerHTML-1;
            }
        }
    }, 1000);


    // Set interval to decrement minutes and handle game over if time runs out
    setInterval(() => {
        if(document.getElementById("time_min").innerHTML==='00'){
            document.getElementById("time_sec").innerHTML='00';
            setTimeout(() => {
                alert("you lost !!");
            }, 50);
        }
        else{
            if(parseInt(document.getElementById("time_min").innerHTML)<=10){
                document.getElementById("time_min").innerHTML="0"+(document.getElementById("time_min").innerHTML-1).toString();
            }
            else{
                document.getElementById("time_min").innerHTML=document.getElementById("time_min").innerHTML-1;
            }
        }
    }, 60*1000);
}