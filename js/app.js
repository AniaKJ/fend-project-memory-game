//List that holds all cards
let myCardsList = document.getElementsByClassName('card');/*returns HTLM list*/
var cardsToShuffle= Array.from(myCardsList);/*converts HTML list into an array*/

// for(i=0;i<16;i++){//clears the style (shaking) that was applied when cards where matched in previous games
//   cardsToShuffle[i].setAttribute('style','animation: none; animation-iteration-count: 0;');
// }

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
      deck.appendChild(card);/*loops over the shuffled array and adds each card to the deck*/
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

let cardsNotMatched = document.querySelectorAll('.card:not(.match)');
let openCard;
let openCards = [];

for (let i=0;i<cardsNotMatched.length;i++){
        let notMatchedCard = cardsNotMatched[i];
        notMatchedCard.addEventListener ('click', function(){
            notMatchedCard.setAttribute('style','pointer-events:none');//prevents from clicking the same card multiple times
            notMatchedCard.setAttribute('class','card open show');
            openCard = notMatchedCard;
            openCards.push(openCard);
            checkMatch();
            // unblock();
            }
        )
 }

/* Function checking if two cards match, for true:
 * changed background of the card & updates the list of unmatched cards,
 * for false: closes the cards
 */
function checkMatch(){
          if (openCards.length===2){

              cardsToShuffle.forEach(function(item){
              item.setAttribute('style','pointer-events:none');
              });

              setTimeout(function(){
                  if(openCards[0].firstElementChild.className===openCards[1].firstElementChild.className){
                    openCards[0].setAttribute('class','card match');
                    openCards[0].setAttribute('style','animation: shake 0.5s; animation-iteration-count: 1;');
                    openCards[1].setAttribute('class','card match');
                    openCards[1].setAttribute('style','animation: shake 0.5s; animation-iteration-count: 1;');
                    openCards=[];
                    cardsNotMatched = document.querySelectorAll('.card:not(.match)');//updates the list of not matched cards
                    if(cardsNotMatched.length===0){//displays alert when all cards matched
                      displayWinnerMessage();
                    };
                  } else {
                    openCards[0].setAttribute('class','card');
                    openCards[1].setAttribute('class','card');
                    openCards=[];
                  }
              }, 900);

              setTimeout(function(){
                cardsToShuffle.forEach(function(item){
                item.setAttribute('style','pointer-events:auto');
                });
              }, 1000);

          }
}

// function unblock (){
//     setTimeout(function(){
//       cardsToShuffle.forEach(function(item){
//       item.setAttribute('style','pointer-events:auto');
//       }
//     );
//   },1100);
// }

// Displays modal when comleted
function displayWinnerMessage (){
  timerStop();
  var modal=document.querySelector('.modal-success');
  modal.style.display='block';
  var modalOverlay =document.querySelector('.modal-overlay');
  modalOverlay.style.display='block';

  document.querySelector('#final-time').appendChild(document.querySelector('.clock').cloneNode(true));
  document.querySelector('#final-moves').appendChild(document.querySelector('.moves').cloneNode(true));
  document.querySelector('#final-score').appendChild(document.querySelector('.stars').cloneNode(true));
}

//Play again button on modal
document.querySelector('.play-again1').addEventListener('click',playAgain);
document.querySelector('.play-again2').addEventListener('click',playAgain);

//Starts new game when 'play again button clicked'
function playAgain(){
  resetFunction();
  var modal=document.querySelector('.modal-success');
  modal.style.display='none';
  var modal=document.querySelector('.modal-failure');
  modal.style.display='none';
  var modalOverlay =document.querySelector('.modal-overlay');
  modalOverlay.style.display='none';
}

//Counts moves & updates the number on the screen & updates the stars rating

let stars= document.querySelector('.stars');

let clickCounter=0;
for (let i=0;i<cardsToShuffle.length;i++){
  let oneCard = cardsToShuffle[i];
  oneCard.addEventListener('click',function(){

    clickCounter=clickCounter+1;
    document.querySelector('.moves').textContent=clickCounter;//updates number of moves on the screen

    if (clickCounter===8||clickCounter===16){//removes stars from the rating when 8 moves and 16 moves made
      // starsNow = document.querySelector('.stars');
      // starsParent=starsNow.parentNode;
      let star=stars.firstElementChild;
      stars.removeChild(star);
    };

    if (clickCounter===35){//game is over if 35 moves reached
      gameOverMessage();
    };
  })
}

//game over function
function gameOverMessage(){
    timerStop();
    var modal=document.querySelector('.modal-failure');
    modal.style.display='block';
    var modalOverlay =document.querySelector('.modal-overlay');
    modalOverlay.style.display='block';
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
function addsStartTimerListener(){
  for (let i=0;i<cardsToShuffle.length;i++){
    let card = cardsToShuffle[i];
    card.addEventListener('click',startTimer);
  }
};

addsStartTimerListener();//this will add event listeners (to start the timer) evety time the page is loaded

//removes the event listeners that start the timer from the cards
function removesStartTimerListener (){
  for (let j=0;j<cardsToShuffle.length;j++){
        let cardx = cardsToShuffle[j];
        cardx.removeEventListener('click', startTimer);
      }
}

//stops the timer
function timerStop(){
  clearInterval(startClock);
};

//zeroes the clock
function timerReset(){
  document.querySelector('.clock').innerHTML = "00:00:00";
};

//Resets everything
function resetFunction(){
  for(let i=0;i<cardsToShuffle.length;i++){
    cardsToShuffle[i].setAttribute('class','card');
  };//hides cards

  for(i=0;i<16;i++){//clears the style (shaking) that was applied when cards where matched in this game
    cardsToShuffle[i].setAttribute('style','animation: none; animation-iteration-count: 0;');
  }

  shuffleDeck();//shuffles cards

  timerStop();//stops timer
  timerReset();//zeros the clock
  addsStartTimerListener();//adds the event listeners back that were removed after the first card click

  clickCounter = 0;
  document.querySelector('.moves').textContent=clickCounter;//zeroes the number of moves

  //resets star rating
  while (stars.firstChild) {//deletes existing stars
    stars.removeChild(stars.firstChild);
  }
  for (i=1;i<4;i++){//tree times creates new star and adds it to <ul class='stars'>
    var starContainer=document.createElement('li');
    const starNew=document.createElement('i');
    starNew.className='fa fa-star';
    starContainer.appendChild(starNew);
    stars.appendChild(starContainer);
  }
};

//Repeat button
document.querySelector('.fa-repeat').addEventListener('click', resetFunction);
