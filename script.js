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
  try {
    if (limit != 1302) {
      limit += 20;
      const response = await fetch(
        `${URL_DATA}pokemon?limit=${limit}&offset=${offset}`
      );
      const data = await response.json();
      renderPokemons(data);
    }
  } catch (error) {
    console.error("Error loading more Pokémon:", error);
    alert("An error occurred while loading more Pokémon. Please try again.");
  }
}

async function searchPokemonByName() {
  try {
    const query = document.getElementById("search").value.trim().toLowerCase();
    if (query.length < 3) return alert("Please enter at least 3 characters to search.");

    const data = await (await fetch(`${URL_DATA}pokemon?limit=1302&offset=0`)).json();
    const results = data.results.filter((p) => p.name.toLowerCase().includes(query));

    results.length ? renderPokemons({ results }) : alert("No Pokémon found with the given name.");
  } catch (error) {
    console.error("Error searching for Pokémon:", error);
    alert("An error occurred while searching for Pokémon. Please try again.");
  }
}
function resetPokedex() {
  try {
    limit = 20;
    offset = 0;
    document.getElementById("search").value = "";
    getPokemons();
  } catch (error) {
    console.error("Error resetting the Pokédex:", error);
    alert("An error occurred while resetting the Pokédex. Please try again.");
  }
}