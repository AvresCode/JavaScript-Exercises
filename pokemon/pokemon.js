"use strict";
/*------------------------------------------------------------------------------
 * In this exercise you will practice fetching data from a web API, using
 * `fetch`, promises, async/await and try/catch.
 *
 * Your solution should both work for the "happy" path (using VALID_URL) as
 * well handle the error in the "unhappy" path (when selecting INVALID_URL).
 *
 * You will need to decide which functions need to be made `async` and where
 * `try/catch` blocks should be added.
 *
 * The HTML file already contains the necessary HTML elements.
 *----------------------------------------------------------------------------*/

const VALID_URL = "https://pokeapi.co/api/v2/pokemon/?limit=5";
const INVALID_URL = "https://pokeapi.co/api/v2/pokemons/?limit=5";

// Fetch the JSON data from the web API that responds to the `url` parameter
// and return a promise that resolves to a corresponding JavaScript object.
// Make sure to check for HTTP errors.
async function fetchJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }

    const parsedData = await response.json();
    return parsedData;
  } catch (err) {
    console.log(err.message); //This will log the error in console
    throw err;
  }
}

function renderResults(pokemons) {
  // 1. Clear the text content of the HTML element with id `error`.
  const errorElement = document.querySelector("#error");
  errorElement.innerText = "";

  // 2. Set the text content of the HTML element with id `json` to JSON text
  //    from the `pokemons` argument, formatted in a human readable form (i.e.,
  //    with indentation and line breaks).
  const pokemonsElement = document.querySelector("#json");
  pokemonsElement.innerText = JSON.stringify(pokemons, null, 2);
}

function renderError(err) {
  // 1. Clear the text content of the HTML element with id `json`.
  const pokemonsElement = document.querySelector("#json");
  pokemonsElement.innerText = "";

  // 2. Set the text content of the HTML element with id `error` to the
  //    `.message` property of the `err` parameter.
  const errorElement = document.querySelector("#error");
  errorElement.innerText = err.message;
}

// Use `fetchJSON()` to fetch data from the selected url.
// If successful, render the data by calling function `renderResults()`.
// On failure, render the error by calling function `renderError()`.

function main() {
  const button = document.querySelector("#button");
  button.addEventListener("click", async () => {
    const option = document.querySelector("#option");
    const url = option.checked ? INVALID_URL : VALID_URL;

    try {
      const response = await fetchJSON(url);
      // console.log(response);
      renderResults(response);
    } catch (err) {
      renderError(err);
    }
  });
}

window.addEventListener("load", main);

// last function without async/await
//fetchJSON(url).then(renderResults).catch(renderError);
// It's better to not catch the error in fetchJSON(url), if we console.log(error) we'll get undefined.
//if we only have catch console.log(error) in fetchJSON(url), the error won't be handeled in main function.
// In order to let main function handel the error either we should remove catch from fetchJSON(url) or add throw error; after console.log(error).
// it's better that higher level function catch the error, in this case main function
