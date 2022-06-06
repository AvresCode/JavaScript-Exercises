'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/blob/main/3-UsingAPIs/Week2/README.md#exercise-2-gotta-catch-em-all
Complete the four functions provided in the starter `index.js` file:
`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.
`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populate the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.
`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.
Use async/await and try/catch to handle promises.
Try and avoid using global variables. As much as possible, try and use function 
parameters and return values to pass data back and forth.
------------------------------------------------------------------------------*/
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const pokemonData = await response.json();
      console.log(pokemonData);
      return pokemonData;
    }
  } catch (error) {
    console.log(error);
  }
}

function fetchAndPopulatePokemons(data) {
  const newDiv = document.createElement('div');
  document.body.appendChild(newDiv);
  newDiv.classList.add('button-section');

  const selectEl = document.createElement('select');
  selectEl.classList.add('select');
  newDiv.appendChild(selectEl);
  selectEl.addEventListener('change', fetchImage);

  const getPokemonButtonEl = document.createElement('button');
  getPokemonButtonEl.setAttribute('type', 'button');
  getPokemonButtonEl.textContent = 'Get Pokemon!';
  newDiv.appendChild(getPokemonButtonEl);
  getPokemonButtonEl.classList.add('pokemon-button');

  getPokemonButtonEl.addEventListener('click', () => {
    const pokemonData = data.results;
    pokemonData.forEach((pokemon) => {
      const pokemonName = document.createElement('option');

      pokemonName.textContent = pokemon.name;
      selectEl.appendChild(pokemonName);
    });
  });
}

async function fetchImage(event) {
  const clearImage = document.querySelector('img');
  if (clearImage) {
    clearImage.remove();
  }

  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${event.currentTarget.value}`;
    const data = await fetchData(url);
    const selected = document.querySelector('select');

    if (selected) {
      const pokemonImage = document.createElement('img');
      pokemonImage.alt = 'Selected Pokemon Image';
      pokemonImage.src = data.sprites.other.home.front_default;
      document.body.appendChild(pokemonImage);
    }
  } catch (error) {
    console.log(error);
  }
}

async function main() {
  try {
    const data = await fetchData('https://pokeapi.co/api/v2/pokemon?limit=151');
    fetchAndPopulatePokemons(data);
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener('load', main);