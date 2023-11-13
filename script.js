'use strict';

//seleccionando elementos
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Iniciando las condiciones
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let jugando = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//funcionalidad de tirar dados

btnRoll.addEventListener('click', function () {
  if (jugando) {
    //generar un numero random para el dado
    const dice = Math.trunc(Math.random() * 6) + 1;

    //mostrar el dado
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //chequear que no sea 1 : si es, cambiar de jugador
    if (dice !== 1) {
      //sumar al puntaje
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //cambiar de jugador
      switchPlayer();
    }
  }
});

//funcionalidad de guardar el puntaje
btnHold.addEventListener('click', function () {
  if (jugando) {
    //guardar el puntaje del jugador actual
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      //el juego termina
      jugando = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.getElementById(`name--${activePlayer}`).textContent =
        'Ganador! 🎉';
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

//resetear el juego
btnNew.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
  document.getElementById(`name--${activePlayer}`).textContent = `JUGADOR ${
    activePlayer + 1
  }`;
  diceEl.classList.add('hidden');
  jugando = true;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
});
