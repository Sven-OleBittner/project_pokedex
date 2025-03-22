const URL_DATA = "https://pokeapi.co/api/v2/";

function init() {
  getPokemons();
}

async function getPokemons() {
  let pokemonCardsRef = document.getElementById("pokemonCards");
  pokemonCardsRef.innerHTML = "";
  const response = await fetch(`${URL_DATA}pokemon`);
  const data = await response.json();
  let pokeKeys = Object.keys(data.results);

  for (let i = 0; i < pokeKeys.length; i++) {
    let types = [];
    const pokemonResponse = await fetch(`${URL_DATA}pokemon/${i + 1}`);
    const pokemonData = await pokemonResponse.json();
    pokemonData.types.forEach((type) => {
      types.push(type.type.name);
    });
    pokemonCardsRef.innerHTML += getPokemonTemplate(i, data, types);
  }
}

function renderPokemons(i, pokeKeys) {
  for (let pokeIndex = 0; pokeIndex < array.length; pokeIndex++) {
    const element = array[pokeIndex];
  }
}
