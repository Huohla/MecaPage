// * Elementos HTML
const startButton = document.getElementById('start');
const progress = document.querySelector('#progress div');
const correctElement = document.querySelector('#correct span');
const incorrectElement = document.querySelector('#incorrect span');
const ppmElement = document.querySelector('#ppm span');
const end = document.getElementById('end');
const restartButton = document.getElementById('restartTestButton');
const wordContainer = document.getElementById('currentWord');
const input = document.querySelector("input");

// * Variables
const time = 60;
let correctLetter;
let incorrectLetter;
let finishLetter;
let letterList = [];
let currentIndex;

// * Funciones
function start() {
    correctLetter = 0;
    incorrectLetter = 0;
    finishLetter = 0;
    // console.log('start');
    end.classList.toggle('hidden', true);
    progress.classList.toggle("completeTime", true);
    startButton.classList.toggle('hidden', true);
}

function newWord() {
    if(letterList.length > 0) {
        letterList.forEach(letter => wordContainer.removeChild(letter));
    }
    const nChosenWord = Math.floor(Math.random() * wordsArray.length);
    const chosenWord = wordsArray[nChosenWord];
    letterList = [];
    currentIndex = 0;
    for (let i = 0; i < chosenWord.length; i++) {
        const letterElement = document.createElement('span');
        letterElement.textContent = chosenWord[i];
        wordContainer.appendChild(letterElement);
        letterList.push(letterElement);
    }
}

//  * Eventos
startButton.addEventListener('click', () => start());
restartButton.addEventListener('click', () => start());

progress.addEventListener("animationend", () => {
    end.classList.toggle('hidden', false);
    // console.log('end');
    progress.classList.toggle("completeTime", false);
    correctElement.textContent = "CAMBIAR";
    incorrectElement.textContent = "CAMBIAR";
    ppmElement.textContent = "CAMBIAR";
})

// * Ejecución
input.focus();
document.documentElement.style.setProperty("--time", time+"s");
newWord();

input.addEventListener("input", (event) => {
    // console.log(event, letterList[currentIndex]);
    if(event.data === letterList[currentIndex].textContent) {
        // console.log('CORRECT LETTER');
        currentIndex++;
        correctLetter++;
        if(currentIndex === letterList.length) {
            newWord();
        }
        // marcar letra finalizada
    } else {
        incorrectLetter++;
        // marcar que hubo un error
    }
});
input.addEventListener("blur", () => input.focus());

// import './style.css'
// import mecaLogo from './mecapage.svg';
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${mecaLogo}" class="logo" alt="MecaPage logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <div class="card">
//       <button id="navigate" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))
