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


function getSinglePokemonTemplate(pokemonData) {
  return `    <div class="card overlay-content">
   <button class="close-btn" onclick="closeOverlay()">X</button>
      <img src="${pokemonData.sprites.front_default}" class="card-img-top" alt="${pokemonData.name}">
      <div class="card-body">
        <div class="btn-group" role="group" aria-label="Basic example">
          <button onclick="getProperties(${pokemonData})" type="button" class="btn btn-primary">Eigenschaften</button>
          <button onclick="getStats(${pokemonData})" type="button" class="btn btn-primary">Stats</button>
          <button onclick="getEvoChain(${pokemonData})" type="button" class="btn btn-primary">Evolutionen</button>
        </div>
        <div id="singlePokemonInfo"></div>
      </div>
    </div>
`;
}

function getEvoChainTemplate(evolutionChain) {
  return `
    <div class="card-body">
      <h5 class="card-title">Evolution Chain</h5>
      <p class="card-text">${evolutionChain.join(" → ")}</p>
    </div>`;
}



function getPropertiesPokemonTemplate(pokemonData) {
  return `   
        <ul class="list-group">
          <li class="list-group-item">An item</li>
          <li class="list-group-item">A second item</li>
          <li class="list-group-item">A third item</li>
          <li class="list-group-item">A fourth item</li>
          <li class="list-group-item">And a fifth one</li>
        </ul>
`;
}

function getStatsPokemonTemplate(params) {
  return `       
       <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar" style="width: 0%"></div>
</div>
<div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar" style="width: 25%"></div>
</div>
<div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar" style="width: 50%"></div>
</div>
<div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar" style="width: 75%"></div>
</div>
<div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar" style="width: 100%"></div>
</div>
`;
}