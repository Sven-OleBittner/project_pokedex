function getPokemonTemplate(pokemonData, sprite, types, number, pokemonResponse) {
  return `
   <div class="card pointer" onclick="showPokemonDetails('${pokemonResponse.url}')" style="width: 12rem">
                  <h4 class="card-title">
                    <span class="poke_name">#${number} ${pokemonData.name}</span>
                  </h4>
                  <img
                    src="${sprite}" alt="${pokemonData.name}"
                    class="card-img-top ${types[0]}"
                  />
                  <div id="cardBody" class="card-body d-flex font-weight-bold justify-content-center">
                    ${types
                      .map(
                        (type) =>
                          `<span class="pokemon-type circle ${type}">${type}</span>`
                      )
                      .join("")}<p class="card-text">                    
                  </div>
                </div>`;
}

// `<div class="overlay-content">
//         <button class="close-btn" onclick="closeOverlay()">X</button>
//         <h2>${pokemonData.name.toUpperCase()}</h2>
//         <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}" />
//         <h3>Types:</h3>
//         <p>${pokemonData.types.map((type) => type.type.name).join(", ")}</p>
//         <h3>Stats:</h3>
//         <ul>
//           ${pokemonData.stats
//             .map(
//               (stat) =>
//                 `<li>${stat.stat.name.toUpperCase()}: ${stat.base_stat}</li>`
//             )
//             .join("")}
//         </ul>
//         <h3>Evolution Chain:</h3>
//         <p>${evolutionChain.join(" → ")}</p>
//       </div>`


function getSinglePokemonTemplate(pokemonData, pokemonUrl) {
  return `    <div class="card overlay-content">
   <button class="close-btn" onclick="closeOverlay()">X</button>
      <img src="${pokemonData.sprites.other.home.front_default}" class="card-img-top" alt="${pokemonData.name}">
      <div class="card-body">
        <div class="btn-group" role="group" aria-label="Basic example">
          <button onclick="getProperties('${pokemonUrl}')" type="button" class="btn btn-primary">Eigenschaften</button>
          <button onclick="getStats('${pokemonUrl}')" type="button" class="btn btn-primary">Stats</button>
          <button onclick="getEvoChain('${pokemonUrl}')" type="button" class="btn btn-primary">Evolutionen</button>
        </div>
        <div id="singlePokemonInfo" class="single_pokemon_info"></div>
      </div>
    </div>
`;
}

function getEvoChainTemplate(evolutionChain) {
  return `
    <div class="card-body">
      <h5 class="card-title">Evolution Chain</h5>
      <div class="evolution-chain d-flex">
        ${evolutionChain
          .map(
            (evolution) => `
            <div class="evolution-item">
              <img src="${evolution.sprite}" alt="${evolution.name}" />
              <p>${evolution.name}</p>
            </div>
          `
          )
          .join("")}
      </div>
    </div>
  `;
}


function getPropertiesPokemonTemplate(pokemonData) {
  return `   
        <ul class="list-group">
          <li class="list-group-item">Base Experience : ${pokemonData.base_experience} Points</li>
          <li class="list-group-item">Height : ${pokemonData.height} m</li>
          <li class="list-group-item">Weight : ${pokemonData.weight} kg</li>
          <li class="list-group-item">A fourth item</li>
          <li class="list-group-item">And a fifth one</li>
        </ul>
`;
}

function getStatsPokemonTemplate(pokemonData) {
  return pokemonData.stats
    .map(
      (stat) => `
      <div class="progress mb-2 pokemon_stats" role="progressbar" aria-label="${stat.stat.name}" aria-valuenow="${stat.base_stat}" aria-valuemin="0" aria-valuemax="255">
        <div class="progress-bar" style="width: ${stat.base_stat / 2.55}%; background-color: #4caf50;">
          ${stat.stat.name.toUpperCase()}: ${stat.base_stat}
        </div>
      </div>
    `
    )
    .join("");
}