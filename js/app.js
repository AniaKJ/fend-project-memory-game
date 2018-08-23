//List that holds all cards
let myCardsList = document.getElementsByClassName('card');/*returns HTLM list*/
var cardsToShuffle= Array.from(myCardsList);/*converts HTML list into an array*/

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

//shuffles cards

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

//Timer

var startTime =0;

function takesStartTime(){
startTime = new Date().getTime();//takes the initial time
};

function takesDurationTime(){
  var elapsedTime = new Date().getTime() - startTime;//takes the current time-initial times --> milliseconds that passedd since the start
  var totalSeconds = Math.floor(elapsedTime / 1000);//converts from milliseconds to seconds
  var hours = Math.floor(totalSeconds/3600);
  totalSeconds = totalSeconds %3600;
  var minutes =Math.floor(totalSeconds/60);
  totalSeconds = totalSeconds %60;
  if(hours<10){hours='0'+hours};
  if(minutes<10){minutes='0'+minutes};
  if(totalSeconds<10){totalSeconds='0'+totalSeconds};
  var time=hours+':'+minutes+':'+totalSeconds;
  document.querySelector('.clock').innerHTML = time;
};

//starts the timer

var startClock;

function startTimer(){
  takesStartTime();
  takesDurationTime();
  startClock= setInterval(takesDurationTime, 100);
  removesStartTimerListener();
}

//click of each card will start the timer
for (let i=0;i<cardsToShuffle.length;i++){
  let card = cardsToShuffle[i];
  card.addEventListener('click',startTimer);
}

//removes the event listeners that start the timer from the cards
function removesStartTimerListener (){
  for (let j=0;j<cardsToShuffle.length;j++){
        let cardx = cardsToShuffle[j];
        cardx.removeEventListener('click', startTimer);
      }
}

function timerStop(){
  clearInterval(startClock);
};

function timerReset(){
  document.querySelector('.clock').innerHTML = "00:00:00";
};

//Repeat button
document.querySelector('.fa-repeat').addEventListener('click',function(){
  for(let i=0;i<cardsToShuffle.length;i++){
    cardsToShuffle[i].setAttribute('class','card');
  };//hides cards
  shuffleDeck();//shuffles cards
});
