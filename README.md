# MecaPage

MecaPage es una pequeña aplicación web para realizar testing de velocidad de cualquier teclado.

## Características principales

- **Pruebas de mecanografía personalizables**: Elige entre diferentes duraciones de prueba (30s, 1min, 2min o prueba libre).
- **Clasificación de resultados**: Visualiza los resultados acumulados y filtrados por el tiempo de la prueba.
- **Interfaz adaptable**: Se ajusta a diferentes tamaños de pantalla, siendo responsiva.
- **Persistencia de datos**: Almacena los resultados utilizando la API `localStorage`.

---

## Estructura del proyecto

La aplicación está dividida en los siguientes componentes principales:

### Archivos y carpetas

```plaintext
ConvertWords/
  ├── convert.js        // Convierte txt en array
  ├── words.txt         // Palabras de la RAE
src/
  ├── main.js           // Lógica principal de la aplicación
  ├── style.css         // Estilos CSS de la aplicación
  ├── mecapage.svg      // Logo de la aplicación
ranking.html            // Página de visualización de resultados
index.html              // Página principal de la aplicación
index.html              // Página de rankings de los test
README.md               // Documentación del proyecto
wordsArray.js           // Array de palabras para las pruebas
```

### Arquitectura

1. **HTML**
   - Contiene la estructura de la página principal (`index.html`) y la página de rankings (`ranking.html`).

2. **CSS**
   - Define los estilos visuales y de diseño adaptable para que la aplicación funcione tanto en dispositivos móviles como en pantallas grandes.

3. **JavaScript**
   - `main.js`: Maneja las pruebas de mecanografía, eventos del usuario y lógica del cronómetro.
   - `wordsArray.js`: Proporciona las palabras aleatorias para las pruebas.

---

## Cómo ejecutar la aplicación

1. **Requisitos previos**
   - Un navegador web moderno compatible con ES6 y `localStorage`.

2. **Pasos para ejecutar**
   - Clona el repositorio en tu máquina local.
     ```bash
     git clone https://github.com/Huohla/MecaPage.git
     ```
   - Navega al directorio del proyecto.
     ```bash
     cd meca-project
     ```
   - Abre el archivo `index.html` en tu navegador.
     ```bash
     npm run dev
     ```
   
---

## Uso de la aplicación

1. **Configuración de la prueba**
   - Juega con el tiempo predeterminado (30s), elige un tiempo entre las opciones o elige "Prueba libre" para practicar sin límite.

2. **Inicio y progreso**
   - Pulsa el botón "Iniciar test" o la barra espaciadora para comenzar.
   - Escribe las palabras que aparecen en pantalla lo más rápido y preciso posible.

3. **Resultados y clasificación**
   - Al finalizar la prueba, se mostrarán las letras correctas, los errores y las palabras por minuto (PPM).
   - Los resultados se almacenan en `localStorage` y pueden visualizarse en la página `ranking.html`.

---

## Tecnologías utilizadas

- **HTML5**: Estructura semántica.
- **CSS3**: Diseño responsivo.
- **JavaScript**: Funcionalidad interactiva y manejo de `localStorage`.
- **Font Awesome**: Iconos en la interfaz.

---