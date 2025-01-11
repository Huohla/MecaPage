document.addEventListener('DOMContentLoaded', () => {
    // * Elementos HTML
    const timeButtons = document.querySelectorAll(".timeButton");
    const progress = document.querySelector('#progress div');
    const startButton = document.getElementById('start');
    const input = document.querySelector("input");
    const wordContainer = document.getElementById('currentWord');
    const end = document.getElementById('end');
    const correctElement = document.querySelector('#correct span');
    const incorrectElement = document.querySelector('#incorrect span');
    const ppmElement = document.querySelector('#ppm span');
    const restartButton = document.getElementById('restartTestButton');
    const endFreeTest = document.getElementById('endFreeTest');

    // * Variables
    let time = 30;
    let correctLetter;
    let incorrectLetter;
    let finishWord;
    let letterList = [];
    let currentIndex;
    let playing = false;

    // * Funciones
    function updateTimeConfig(event) {
        const clickedButton = event.currentTarget;
        const newTime = clickedButton.getAttribute('timeconfig');
        timeButtons.forEach(button => button.classList.remove('active'));
        clickedButton.classList.add('active');
        time = newTime && newTime !== 'free' ? parseInt(newTime, 10) : 0; // 0 indica prueba libre
        document.documentElement.style.setProperty("--time", time > 0 ? `${time}s` : 'none'); // Ajustar el tiempo
        const isFreeTest = time === 0; // Es prueba libre
        endFreeTest.classList.toggle('hidden', !isFreeTest); // Mostrar/ocultar el mensaje de "suprimir"
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

    function start() {
        playing = true;
        startButton.classList.toggle('hidden', true);
        wordContainer.classList.toggle('hidden', false);
        restartButton.classList.toggle('hidden', true);
        end.classList.toggle('hidden', true);
        progress.classList.toggle("completeTime", time > 0);
        correctLetter = 0;
        incorrectLetter = 0;
        finishWord = 0;
        newWord();
        letterList[0].classList.toggle("currentLetter");
    }

    function endFreeMode() {
        if (time !== 0) return; // Solo terminar si es prueba libre
        playing = false;
        wordContainer.classList.toggle('hidden', true);
        end.classList.toggle('hidden', false);
        correctElement.textContent = correctLetter;
        correctElement.style.color = "#ace3bb";
        incorrectElement.textContent = incorrectLetter;
        incorrectElement.style.color = "#ace3bb";
        const ppm = finishWord;
        saveResult(time, ppm, correctLetter, incorrectLetter); // Guardar resultado
        ppmElement.textContent = ppm;
        ppmElement.style.color = "#ace3bb";
        restartButton.classList.toggle('hidden', false);
    }    

    function createLetterEffect(element) {
        const letter = element.textContent;
        const letterPosition = element.getBoundingClientRect(); // Función que devuelve en top, bottom, left y right las coordenadas de un elemento.
        const newLetter = document.createElement('span');
        newLetter.textContent = letter;
        newLetter.style = `
            left: ${letterPosition.left}px;
            top: ${letterPosition.top}px;
        `
        document.body.appendChild(newLetter);
        newLetter.classList.add('dissapear');
        element.classList.toggle("invisible", true);
    }

    //  * Eventos
    timeButtons.forEach(button => {
        button.addEventListener('click', updateTimeConfig);
    });

    startButton.addEventListener('click', () => start());
    restartButton.addEventListener('click', () => start());

    progress.addEventListener("animationend", () => {
        if (time === 0) return; // No terminar la prueba si es prueba libre
        playing = false;
        progress.classList.toggle("completeTime", false);
        wordContainer.classList.toggle('hidden', true);
        end.classList.toggle('hidden', false);
        correctElement.textContent = correctLetter;
        correctElement.style.color = "#ace3bb";
        incorrectElement.textContent = incorrectLetter;
        incorrectElement.style.color = "#ace3bb";
        const ppm = time > 0 ? finishWord * (60 / time) : finishWord;
        saveResult(time, ppm, correctLetter, incorrectLetter); // Guardar resultado
        ppmElement.textContent = ppm
        ppmElement.style.color = "#ace3bb";
        restartButton.classList.toggle('hidden', false);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Delete' && time === 0 && playing) {
            endFreeMode();
        }
    });    

    // * Ejecución
    input.focus();
    input.addEventListener("blur", () => input.focus());

    document.documentElement.style.setProperty("--time", time + "s"); // ? Es redundante?

    input.addEventListener("input", (event) => {
        if(!playing) {
            if(event.data === " ") start();
            return;
        }
        if(event.data === letterList[currentIndex].textContent) {
            createLetterEffect(letterList[currentIndex]);
            currentIndex++;
            correctLetter++;
            if(currentIndex === letterList.length) {
                newWord();
                finishWord++;
            }
            letterList[currentIndex].classList.toggle("currentLetter")
        } else {
            incorrectLetter++;
        }
    });
});

// * EXPORTACIONES
export function saveResult(time, ppm, corrects, errors) {
    const rankings = JSON.parse(localStorage.getItem('rankings')) || [];
    const date = new Date().toLocaleString();
    const newResult = {
        time: time > 0 ? time : 'free',
        ppm: ppm || 0,
        corrects: corrects || 0,
        errors: errors || 0,
        date: date
    };
    rankings.push(newResult);
    localStorage.setItem('rankings', JSON.stringify(rankings));
}

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
