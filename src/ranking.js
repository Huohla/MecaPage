// * IMPORTACIONES
import { saveResult } from "./main";

// * Elementos HTML
const filterButtons = document.querySelectorAll(".filterButton");

function setupFilterButtons(buttons) {
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            loadRankings(filter);

            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

// * Funciones
function normalizeTime(time) {
    return time > 0 ? `${time}s` : 'Prueba Libre';
}

function loadRankings(filter = 'all') {
    let rankings;
    try {
        rankings = JSON.parse(localStorage.getItem('rankings')) || [];
    } catch (error) {
        console.error('Error al cargar rankings:', error);
        rankings = [];
    }

    const filteredRankings = filter === 'all' 
        ? rankings 
        : rankings.filter(rank => rank.time == filter);

    // Ordenar los rankings por fecha
    filteredRankings.sort((a, b) => new Date(b.date) - new Date(a.date));

    console.log(`Rankings (${filter}):`, filteredRankings);

    const tableBody = document.querySelector('#rankingTable tbody');
    tableBody.innerHTML = '';

    filteredRankings.forEach((rank) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${normalizeTime(rank.time)}</td>
            <td>${rank.ppm}</td>
            <td>${rank.corrects}</td>
            <td>${rank.errors}</td>
            <td>${rank.date}</td>
        `;
        tableBody.appendChild(row);
    });
}

// * Ejecución
// Inicializar rankings al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    console.log('Contenido de localStorage:', localStorage.getItem('rankings'));
    loadRankings(); // Cargar todos los rankings por defecto
    setupFilterButtons(filterButtons); // Configurar los botones de filtro
});