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
const timeButtons = document.querySelectorAll(".timeButton");

// * Variables
let time = 30;
let correctLetter;
let incorrectLetter;
let finishWord;
let letterList = [];
let currentIndex;
let playing = false;

// * Funciones
function start() {
    if(!time) {
        time = 30;
        // ? Hace falta esto?
        document.documentElement.style.setProperty("--time", time + "s");
    }
    playing = true;
    wordContainer.classList.toggle('hidden', false);
    restartButton.classList.toggle('hidden', true);
    newWord();
    correctLetter = 0;
    incorrectLetter = 0;
    finishWord = 0;
    // console.log('start');
    end.classList.toggle('hidden', true);
    letterList[0].classList.toggle("currentLetter");
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

function createLetterEfect(element) {
    element.classList.toggle("invisible", true);
    const letter = element.textContent;
    const letterPosition = element.getBoundingClientRect(); // Función que devuelve en top, bottom, left y right las coordenadas de un elemento.
    console.log(letter, letterPosition)
    const newLetter = document.createElement('span');
    newLetter.style = `
        left: ${letterPosition.left}px;
        top: ${letterPosition.top}px;
    `
    newLetter.classList.add('dissapear');
    newLetter.textContent = letter;
    document.body.appendChild(newLetter);
}

function updateTimeConfig(event) {
    const clickedButton = event.currentTarget;
    const newTime = clickedButton.getAttribute('timeconfig');
    time = newTime ? parseInt(newTime, 10) : 0; // 0 Indica prueba libre
    timeButtons.forEach(button => button.classList.remove('active'));
    clickedButton.classList.add('active');
    document.documentElement.style.setProperty("--time", time+"s");
    console.log(`Tiempo configurado: ${time > 0 ? time + ' segundos' : 'Prueba libre'}`);
}

//  * Eventos
startButton.addEventListener('click', () => start());
restartButton.addEventListener('click', () => start());

progress.addEventListener("animationend", () => {
    if (time === 0) return; // No terminar la prueba si es prueba libre
    playing = false;
    end.classList.toggle('hidden', false);
    // console.log('end');
    progress.classList.toggle("completeTime", false);
    correctElement.textContent = correctLetter;
    correctElement.style.color = "#ace3bb";
    incorrectElement.textContent = incorrectLetter;
    incorrectElement.style.color = "#ace3bb";
    ppmElement.textContent = finishWord * (60 / time);
    ppmElement.style.color = "#ace3bb";
    wordContainer.classList.toggle('hidden', true);
    restartButton.classList.toggle('hidden', false);
})

timeButtons.forEach(button => {
    button.addEventListener('click', updateTimeConfig);
});

// * Ejecución
input.focus();
document.documentElement.style.setProperty("--time", time + "s");
//newWord();

input.addEventListener("input", (event) => {
    if(!playing) {
        if(event.data === " ") start();
        return;
    }
    // console.log(event, letterList[currentIndex]);
    if(event.data === letterList[currentIndex].textContent) {
        // console.log('CORRECT LETTER');
        createLetterEfect(letterList[currentIndex]);
        currentIndex++;
        correctLetter++;
        if(currentIndex === letterList.length) {
            newWord();
            finishWord++;
        }
        letterList[currentIndex].classList.toggle("currentLetter")
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
