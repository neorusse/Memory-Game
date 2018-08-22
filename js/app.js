// Global Variables
let matchedCards = [],
    displayedCards = [],
    moves = 0,
    firstClick = true,
    hours, minutes, seconds,
    totalTime = 0,
    incrementer;

/*
 * Create a list that holds all of your cards
 */
const cardIcons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

const cardWrapper = document.querySelector(".deck");

// Shuffle function for Cards
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * Initialize the game
 */

function init() {

    // Shuffle the current `iconsList`
    const icons = shuffle(cardIcons);

    // CreateDocumentFragment is used to achieve better performance and code efficiency
    const cardsFragment = document.createDocumentFragment();

    // Creating and Dynamically rendering of our cards
    for(let icon of icons) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${icon}"></i>`;
        cardsFragment.appendChild(card);   
    }
    cardWrapper.appendChild(cardsFragment);
}


/*
 * Start Game
 */

 function start() {

    // Call `init` to create new cards
    init();

    // Include a Click Event to Each of the Card
    clickOnCard();

 }

/*
 * Click Event
 */

// let displayedCards = []; // let matchedCards = []; // let firstClick = true;

const cards = cardWrapper.children;

// Click Function
function clickOnCard() {

    for(let i = 0; i < cards.length; i++) {

        // Card Click Event
        cards[i].addEventListener("click", function() {

           const currentCard = this;
           const previousCard = displayedCards[0];

           // First Click Indicator
            if(firstClick) {
                // Start our timer
                startTimer();
                // Change our First Click indicator's value
                firstClick = false;
            }

            // We have an existing Opened card
            if(displayedCards.length === 1) {

                currentCard.classList.add("open", "show", "disabled");
                displayedCards.push(currentCard);

                // We should compare our 2 opened cards!
                compare(currentCard, previousCard);

                // Empty Display Cards Array
                displayedCards = [];

                // Add a Move
                addMove();

                // User Rating
                userRating();

                } else {

                // We don't have any opened cards
                currentCard.classList.add("open", "show", "disabled");
                displayedCards.push(currentCard);
            }  
        });
    }    
}


/*
 * Compare the 2 cards
 */
function compare(currentCard, previousCard) {

    // Matcher
    if(currentCard.innerHTML === previousCard.innerHTML) {
                
        // Matched
        currentCard.classList.add("match");
        previousCard.classList.add("match");

        // Place both cards inside matchedCards Array
        matchedCards.push(currentCard, previousCard);

        // Check if the game is over!
        isOver();

    } else {
        
        // Wait 500ms then, do this!
        setTimeout(function() {
            currentCard.classList.remove("open", "show", "disabled");
            previousCard.classList.remove("open", "show", "disabled");
        }, 500);
    }
}


/*
 * Add move
 */

const counter = document.querySelector(".moves");
// let moves = 0;
counter.innerHTML = 0;

function addMove() {
    moves++;
    counter.innerHTML = moves;
}


/*
 * Check if the game is over!
 */
function isOver() {

    // Compare content of both arrays
    if(cardIcons.length === matchedCards.length) {

        // call End of Game Message
        endOfGameMessage();
        
    }
}

/*
 * End of Game Message!
 */

 const message = document.querySelector(".modal");

function endOfGameMessage() {

    // display the Message
    message.style.top = "0";

    // Stop Timer
    stopTimer();

    // Add Moves
    const totalMoves = document.querySelector("#total-moves");
    totalMoves.innerHTML = moves + 1;

    // declare star rating variable
    let starRating = document.querySelector(".stars").innerHTML;
    document.getElementById("total-rate").innerHTML = starRating;
    
    // Add time to the Modal
    const totalHours       = document.querySelector("#total-hours");
    const totalMinutes     = document.querySelector("#total-minutes");
    const totalSeconds     = document.querySelector("#total-seconds");
    totalHours.innerHTML   = hours;
    totalMinutes.innerHTML = minutes;
    totalSeconds.innerHTML = seconds;
}

/*
 * Reset Button
 */

 const resetButton = document.querySelector(".score-panel .reset-game");

// Add click event listener to Reset Button
 resetButton.addEventListener('click', function(){
     // Start the Game Again
     repeat();
     
 });

/*
 * Reset Button
 */

const playAgainButton = document.querySelector(".modal .play-again");

// Add click event listener to Play Again Button
playAgainButton.addEventListener('click', function(){

    // Hide End of Game Message
    message.style.top = "-150%";

    // Start the Game Again
    repeat();
});


/*
 * Player Rating
 */

// declare variables for star icons
const stars = document.querySelectorAll(".fa-star-half-o");

function userRating() {

    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}


/*
*  Timer
*/

const secondsContainer = document.querySelector("#seconds");
const minutesContainer = document.querySelector("#minutes");
const hoursContainer   = document.querySelector("#hours");

function startTimer() {

    // Start Incrementer
    incrementer = setInterval(function() {

        // Add totalTime by 1
        totalTime += 1;

        // Convert Total Time to H:M:S
        calculateTime(totalTime);

        // Change the current time values
        secondsContainer.innerHTML = seconds;
        minutesContainer.innerHTML = minutes;
        hoursContainer.innerHTML   = hours;

    }, 1000);

}

/*
 * Function to Calculate Time
 */

function calculateTime(totalTime) {
    hours   = Math.floor( totalTime / 60 / 60);
    minutes = Math.floor( (totalTime / 60) % 60);
    seconds = totalTime % 60;
}

/*
 * Function to Stop Time
 */

function stopTimer() {
    // Stop Timer
    clearInterval(incrementer);
}

/*
 * Reset All Game Variables
 */
function reset() {
    // Empty the array
    matchedCards = [];
    displayedCards = [];
    // reset moves
    moves = 0;
    counter.innerHTML = moves;
    firstClick = true;
    // reset timer
    hoursContainer.innerHTML = "00";
    minutesContainer.innerHTML = "00";
    secondsContainer.innerHTML = "00";
    stopTimer();
    totalTime = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
    // reset rating
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#ffd700";
        stars[i].style.visibility = "visible";
    }
}

/*
 * Add move
 */

 function repeat() {

    // Removes all Cards
    cardWrapper.innerHTML = "";

    // Reset Current Values
    reset();

    // Start the Game Again
    start();
 }

// Start the game for the first time!
start();

















