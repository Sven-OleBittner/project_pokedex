const URL_DATA = "https://pokeapi.co/api/v2/";
let limit = 20;
let offset = 0;

function init() {
  getPokemons();
}

async function getPokemons() {
  const response = await fetch(
    `${URL_DATA}pokemon?limit=${limit}&offset=${offset}`
  );
  const data = await response.json();
  renderPokemons(data);
}

async function renderPokemons(data) {
  let pokemonCardsRef = document.getElementById("pokemonCards");
  pokemonCardsRef.innerHTML = "";

  for (let pokemon of data.results) {
    const pokemonResponse = await fetch(pokemon.url);
    const pokemonData = await pokemonResponse.json();
    const sprite = pokemonData.sprites.front_default;
    const types = pokemonData.types.map((type) => type.type.name);
    const number = pokemonData.id;
    pokemonCardsRef.innerHTML += getPokemonTemplate(
      pokemonData,
      sprite,
      types,
      number
    );
  }
}

async function loadMore() {
  if (limit != 1302) {
    limit += 20;
    const response = await fetch(
      `${URL_DATA}pokemon?limit=${limit}&offset=${offset}`
    );
    const data = await response.json();
    renderPokemons(data);
  }
}

async function searchPokemonByName() {
  const searchQuery = document.getElementById("search").value.trim().toLowerCase();
  if (searchQuery.length < 3) return alert("Please enter at least 3 characters to search.");

  const data = await (await fetch(`${URL_DATA}pokemon?limit=1302&offset=0`)).json();
  const filteredPokemons = data.results.filter(pokemon => pokemon.name.toLowerCase().includes(searchQuery));

  filteredPokemons.length
    ? renderPokemons({ results: filteredPokemons })
    : alert("No Pokémon found with the given name.");
}