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
    const sprite = pokemonData.sprites.other.home.front_default;
    const types = pokemonData.types.map((type) => type.type.name);
    const number = pokemonData.id;
    pokemonCardsRef.innerHTML += getPokemonTemplate(
      pokemonData,
      sprite,
      types,
      number,
      pokemonResponse
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
    if (query.length < 3)
      return alert("Please enter at least 3 characters to search.");

    const data = await (
      await fetch(`${URL_DATA}pokemon?limit=1302&offset=0`)
    ).json();
    const results = data.results.filter((p) =>
      p.name.toLowerCase().includes(query)
    );

    results.length
      ? renderPokemons({ results })
      : alert("No Pokémon found with the given name.");
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

async function showPokemonDetails(pokemonUrl) {
  document.body.classList.add("overflow_hidden");
  try {
    const pokemonResponse = await fetch(pokemonUrl);
    const pokemonData = await pokemonResponse.json();

    const overlay = document.getElementById("singlePokemon");
    overlay.innerHTML = getSinglePokemonTemplate(pokemonData, pokemonUrl);
    overlay.style.display = "flex";
  } catch (error) {
    console.error("Error fetching Pokémon details:", error);
    alert(
      "An error occurred while fetching Pokémon details. Please try again."
    );
  }

}

function closeOverlay(event) {
  if (!event || event.target.classList.contains("overlay")) {
    document.body.classList.remove("overflow_hidden");
    const overlay = document.getElementById("singlePokemon");
    overlay.style.display = "none";
    overlay.innerHTML = ""; // Leeren des Overlays
  }
}
async function getProperties(pokemonUrl) {
  const overlay = document.getElementById("singlePokemonInfo");
  const pokemonResponse = await fetch(pokemonUrl);
  const pokemonData = await pokemonResponse.json();
  overlay.innerHTML = getPropertiesPokemonTemplate(pokemonData);
  overlay.style.display = "flex";
}

async function getStats(pokemonUrl) {
  const overlay = document.getElementById("singlePokemonInfo");
  const pokemonResponse = await fetch(pokemonUrl);
  const pokemonData = await pokemonResponse.json();
  overlay.innerHTML = getStatsPokemonTemplate(pokemonData);
  overlay.style.display = "flex";
}

async function getEvoChain(pokemonUrl) {
  const overlay = document.getElementById("singlePokemonInfo");
  try {
    const pokemonData = await (await fetch(pokemonUrl)).json();
    const speciesData = await (await fetch(pokemonData.species.url)).json();
    const evolutionData = await (
      await fetch(speciesData.evolution_chain.url)
    ).json();

    const evolutionChain = [];
    let current = evolutionData.chain;
    while (current) {
      const evoData = await (
        await fetch(`${URL_DATA}pokemon/${current.species.name}`)
      ).json();
      evolutionChain.push({
        name: current.species.name,
        sprite: evoData.sprites.front_default,
      });
      current = current.evolves_to[0];
    }

    overlay.innerHTML = getEvoChainTemplate(evolutionChain);
    overlay.style.display = "flex";
  } catch (error) {
    console.error("Error fetching evolution chain:", error);
    alert("An error occurred while fetching the evolution chain.");
  }
}