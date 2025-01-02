// * Elementos HTML
const start = document.getElementById('start');
const progress = document.querySelector('#progress div');

// * Variables
const time = 60;

start.addEventListener('click', () => {
  console.log('start');
  progress.classList.toggle("completeTime", true);
  start.classList.toggle('hidden', true);
})

progress.addEventListener("animationend", () => {
    console.log('end');
    progress.classList.toggle("completeTime", false);
})

// * Ejecución
document.documentElement.style.setProperty("--time", time+"s");

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
