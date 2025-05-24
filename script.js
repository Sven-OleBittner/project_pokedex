const URL_DATA = "https://pokeapi.co/api/v2/";
const pokeList = [];
let limit = 20;

function init() {
  getPokeDatas();
}

async function getPokeDatas() {
  let response = await fetch(URL_DATA + `pokemon?limit=${limit}&offset=0`);
  let pokeData = await response.json();
  renderPokemons(pokeData);
}

function showLoadingSpinner() {
  document.getElementById("lodingSpinner").innerHTML =
    "<img src='./assets/img/pokeball-loader.svg'>";
}

async function renderPokemons(pokeData) {
    showLoadingSpinner();
  let pokeContainer = document.getElementById("pokeList");
  pokeContainer.innerHTML = "";
  for (let pokeIndex = 0; pokeIndex < pokeData.results.length; pokeIndex++) {
    let url = pokeData.results[pokeIndex].url;
    let response = await fetch(url);
    let data = await response.json();
    let id = data.id;
    let name = getPokeName(data);
    let sprite = data.sprites.front_default;
    let types = getPokeTypes(data);
    let bg = data.types[0].type.name;
    pokeContainer.innerHTML += getPokemonTemplate(id, name, sprite, types, bg);
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
