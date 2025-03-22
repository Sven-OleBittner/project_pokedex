const URL_DATA = "https://pokeapi.co/api/v2/";

function init() {
  getPokemons();
}

async function getPokemons() {
  const response = await fetch(`${URL_DATA}pokemon`);
  const data = await response.json();
  let pokeKeys = Object.keys(data.results);
  renderPokemons(data, pokeKeys);
}

async function renderPokemons(data, pokeKeys) {
    let pokemonCardsRef = document.getElementById("pokemonCards");
    pokemonCardsRef.innerHTML = "";
  
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
