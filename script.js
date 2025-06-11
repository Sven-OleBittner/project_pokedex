const URL_DATA = "https://pokeapi.co/api/v2/";
const pokeList = [];
let limit = 20;

function init() {
  getPokeDatas();
  document
    .getElementById("searchInput")
    .addEventListener("input", searchPokemons);
  document
    .getElementById("searchButton")
    .addEventListener("click", searchPokemons);
}

async function getPokeDatas() {
  showLoadingSpinner();
  await new Promise((r) => setTimeout(r, 1));
  let response = await fetch(URL_DATA + `pokemon?limit=${limit}&offset=0`);
  let pokeData = await response.json();

  await pushPokemons(pokeData);
  deleteLoadingSpinner();
}

function searchPokemons() {
  const input = document.getElementById("searchInput").value.trim().toLowerCase();
  const pokeContainer = document.getElementById("pokeList");
  pokeContainer.innerHTML = "";

  if (!input.length) return renderPokemons();
  if (input.length < 3) return pokeContainer.innerHTML = "<p>Bitte mindestens 3 Buchstaben eingeben.</p>";

  const filtered = pokeList.filter(poke => poke.name.toLowerCase().includes(input));
  if (!filtered.length) return pokeContainer.innerHTML = "<p>Kein Pokémon gefunden.</p>";

  filtered.forEach(poke =>
    pokeContainer.innerHTML += getPokemonTemplate(pokeList.indexOf(poke))
  );
}

function showLoadingSpinner() {
  document.getElementById("loadingSpinner").innerHTML =
    '<img src="./assets/img/pokeball-loader.svg">';
  document.getElementById("pokeList").classList.add("d_none");
  document.getElementById("btnContainer").classList.add("d_none");
}

function deleteLoadingSpinner() {
  document.getElementById("loadingSpinner").innerHTML = "";
  document.getElementById("pokeList").classList.remove("d_none");
  document.getElementById("btnContainer").classList.remove("d_none");
}

async function pushPokemons(pokeData) {
  for (let pokeIndex = 0; pokeIndex < pokeData.results.length; pokeIndex++) {
    let url = pokeData.results[pokeIndex].url;
    let response = await fetch(url);
    let data = await response.json();
    pokeList.push({
      id: data.id,
      name: getPokeName(data),
      sprite: data.sprites.front_default,
      types: getPokeTypes(data),
      bg: data.types[0].type.name,
      url: url,
    });
  }
  renderPokemons();
}

function renderPokemons() {
  let pokeContainer = document.getElementById("pokeList");
  pokeContainer.innerHTML = "";
  for (let pokeIndex = 0; pokeIndex < pokeList.length; pokeIndex++) {
    pokeContainer.innerHTML += getPokemonTemplate(pokeIndex);
  }
}

function getPokeName(data) {
  let lowerCaseName = data.name;
  let upperCaseName =
    lowerCaseName.charAt(0).toUpperCase() + lowerCaseName.slice(1);
  return upperCaseName;
}

function getPokeTypes(data) {
  let types = data.types
    .map(
      (type) =>
        `<img src="./assets/types/${type.type.name}.png" alt="${type.type.name}" class="type-icon">`
    )
    .join(" ");
  return types;
}

function loadMorePokes() {
  pokeList.length = 0; // Clear the existing list
  limit += 20;
  getPokeDatas();
  
  
}

async function getPokeSpeciesData(url) {
  let response = await fetch(url);
  let data = await response.json();
  let speciesUrl = data.species.url;
  let speciesResponse = await fetch(speciesUrl);
  let speciesData = await speciesResponse.json();

  await getPokeData(data, speciesData);
}

async function getPokeData(data, speciesData) {
  let id = data.id;
  let name = getPokeName(data);
  let sprite = data.sprites.front_default;
  let types = getPokeTypes(data);
  let pokeCry = data.cries.legacy;
  let weight = data.weight / 10;
  let eggGroup = speciesData.egg_groups.map((group) => group.name).join(", ");
  let pokeStats = getPokeStats(data.stats);
  let evoChain = await getEvoChain(speciesData.evolution_chain.url);

  renderPokeDetails(
    id,
    name,
    sprite,
    types,
    pokeCry,
    weight,
    eggGroup,
    pokeStats,
    evoChain
  );
}

function getPokeStats(stats) {
  return stats.map((stat) => {
    return {
      name: stat.stat.name,
      value: stat.base_stat,
    };
  });
}

async function getEvoChain(url) {
  let response = await fetch(url);
  let data = await response.json();
  let evoNames = [];
  function traverse(chain) {
    evoNames.push(chain.species.name);
    if (chain.evolves_to && chain.evolves_to.length > 0) {
      traverse(chain.evolves_to[0]);
    }
  }
  traverse(data.chain);
  const evoChainHtml = evoNames
    .map(
      (n) =>
        `<span class="evo-pokemon">${
          n.charAt(0).toUpperCase() + n.slice(1)
        }</span>`
    )
    .join('<span class="evo-arrow"> &rarr; </span>');
  return evoChainHtml;
}

function playCry(cryUrl) {
  if (cryUrl) {
    let audio = new Audio(cryUrl);
    audio.play();
  }
}

function renderPokeDetails(
  id,
  name,
  sprite,
  types,
  pokeCry,
  weight,
  eggGroup,
  pokeStats,
  evoChain
) {
  document.getElementById("pokeDetails").innerHTML = getPokemonDetailsTemplate(
    id,
    name,
    sprite,
    types,
    pokeCry,
    weight,
    eggGroup,
    pokeStats,
    evoChain
  );
  document.getElementById("pokeDetailsOverlay").classList.remove("d_none");
}

function closePokeDetails() {
  document.getElementById("pokeDetailsOverlay").classList.add("d_none");
}

function showPrevPokemon(currentId) {
  if (currentId > 1) {
    getPokeSpeciesData(`${URL_DATA}pokemon/${currentId - 1}`);
  }
}

function showNextPokemon(currentId) {
  getPokeSpeciesData(`${URL_DATA}pokemon/${currentId + 1}`);
}
