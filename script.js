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
  // let pokeKeys = Object.keys(data.results);
  let pokemonCardsRef = document.getElementById("pokemonCards");
  pokemonCardsRef.innerHTML = "";

  for (let i = 0; i < data.results.length; i++) {
    let types = await getPokemonType(i);
    pokemonCardsRef.innerHTML += getPokemonTemplate(i, data, types);
    renderTypesCircle(i, types);
  }
}

async function renderTypesCircle(i, types) {
  let typeCircleRef = document.getElementById(`${i + 1}cardBody`);
  let typeCircle = await getTypeCircle(types);
  typeCircleRef.innerHTML = typeCircle;
}

async function getPokemonType(i) {
  let types = [];
  const pokemonResponse = await fetch(`${URL_DATA}pokemon/${i + 1}`);
  const pokemonData = await pokemonResponse.json();
  pokemonData.types.forEach((type) => {
    types.push(type.type.name);
  });
  return types;
}

async function getTypeCircle(types) {
  if (types.length == 1) {
    return getTypeCircleSingle(types);
  } else {
    return getTypeCircleDouble(types);
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

function searchPokemons() {
  const searchQuery = document.getElementById("search").value;
  filterPokemonByName(searchQuery);
}

async function filterPokemonByName(searchQuery) {
  const response = await fetch(`${URL_DATA}pokemon?limit=1302&offset=0`);
  let data = await response.json();

  // Filter Pokémon basierend auf dem Namen
  let filteredPokemons = data.results.indexOf(searchQuery.toLowerCase());
  if (filteredPokemons !== -1) {
    console.log(`Pokemon gefunden an Index: ${filteredPokemons}`);
  } else {
    console.log("Pokemon nicht gefunden");
  }
data.results = filteredPokemons;
  // Render die gefilterten Pokémon
  renderPokemons(data);
}
