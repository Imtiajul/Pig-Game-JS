'use strict'
var scores, roundScore, winningScore
let activePlayer, playing

// cathcing element 
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const score0El = document.getElementById('score--0')
const score1El = document.getElementById('score--1')
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')
const diceEl = document.querySelector('.dice')
// button
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

// starting condition
const init = function () {
   scores = [0, 0]
   roundScore = 0
   winningScore = 40
   activePlayer = 0
   playing = true

   score0El.textContent = '0'
   score1El.textContent = '0'
   current0El.textContent = '0'
   current1El.textContent = '0'
   diceEl.style.display = 'none';

   // remove active class
   player0El.classList.remove('player--active');
   player1El.classList.remove('player--active');

   player0El.classList.remove('player--winner');
   player1El.classList.remove('player--winner');
   document.querySelector('#name--0').textContent = 'Player 1';
   document.querySelector('#name--1').textContent = 'Player 2';
}
init();

//next player
function switchPlayer() {
   activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
   roundScore = 0;

   document.getElementById('current--0').textContent = 0;
   document.getElementById('current--1').textContent = 0;

   document.querySelector('.player--' + activePlayer).classList.toggle('player--active');
   // player1El.classList.toggle('player--active');

   diceEl.style.display = 'none';
}

//roll button 
btnRoll.addEventListener('click', () => {
   if (playing) {
      //   1. random number 
      var dice = Math.ceil(Math.random() * 6);

      // 2. displaying dice
      var diceDOM = diceEl
      diceDOM.style.display = 'block';
      diceDOM.src = './img/dice-' + dice + '.png';
      // 3. updating the dice value if the dice score is not 1
      if (dice !== 1) {
         // adding score
         roundScore += dice;
         document.getElementById('current--' + activePlayer).textContent = roundScore;
      } else {
         //next nextplayer
         switchPlayer();
      }
   }
})
//hold button
btnHold.addEventListener('click', () => {
   if (playing) {
      // updating active player score
      scores[activePlayer] += roundScore;

      //ui update
      document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];
      if (scores[activePlayer] >= winningScore) {

         document.querySelector('#name--' + activePlayer).textContent = 'WINNER!';

         document.querySelector('.player--' + activePlayer).classList.add('player--winner');
         document.querySelector('.player--' + activePlayer).classList.remove('player--active');

         //next nextplayer
         switchPlayer();
         //finish the game
         playing = false
      } else {
         //next nextplayer
         switchPlayer();
      }
   }
})

//new game button
document.querySelector('.btn--new').addEventListener('click', init)