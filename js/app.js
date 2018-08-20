/*
 * Create a list that holds all of your cards
 */
let myCardsList = document.getElementsByClassName('card');/*returns HTLM list*/
var cardsToShuffle= Array.from(myCardsList);/*converts HTML list into an array*/

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Shuffel cards

function shuffleDeck(){
    let shuffledCards = shuffle(cardsToShuffle);/*creates an array of shuffled cards*/
    for (let i=0;i<shuffledCards.length;i++){
      let card = shuffledCards[i];
      let deck = document.querySelector('.deck');
      deck.appendChild(card);/*lops over the shuffled array and adds each card to the deck*/
    }
}

shuffleDeck();/*this function will be run everytime page is loaded*/

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

const cardsNotMatched = document.querySelectorAll('.card:not(.match)');
let openCard;
let openCards = [];

for (let i=0;i<cardsNotMatched.length;i++){
        let notMatchedCard = cardsNotMatched[i];
        notMatchedCard.addEventListener ('click', function(){
            notMatchedCard.setAttribute('class','card open show');
            openCard = notMatchedCard;
            openCards.push(openCard);
            checkMatch();
            }
        )
 }

function checkMatch(){
    setTimeout(function(){

      if (openCards.length===2){
          if(openCards[0].firstElementChild.className===openCards[1].firstElementChild.className){
            openCards[0].setAttribute('class','card match');
            openCards[1].setAttribute('class','card match');
            openCards=[];
          } else {
            openCards[0].setAttribute('class','card');
            openCards[1].setAttribute('class','card');
            openCards=[];
          }
      }

    }, 1000);

}

//Counts moves & updates the number on the screen & updates the stars rating

let clickCounter=0;
for (let i=0;i<cardsToShuffle.length;i++){
  let oneCard = cardsToShuffle[i];
  oneCard.addEventListener('click',function(){
    clickCounter=clickCounter+1;
    document.querySelector('.moves').textContent=clickCounter;//updates number of moves on the screen
    if (clickCounter===8||clickCounter===16){//removes stars from the rating when 8 moves and 16 moves made
      let stars = document.querySelector('.stars');
      let star=stars.firstElementChild;
      stars.removeChild(star);
    };

  })
}
