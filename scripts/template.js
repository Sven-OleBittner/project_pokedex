function getPokemonTemplate(pokemonData, sprite, types, number) {
  return `
   <div class="card pointer" style="width: 12rem">
                  <h4 class="card-title">
                    <span class="poke_name">#${number} ${
    pokemonData.name
  }</span>
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

// function getTypeCircleSingle(params) {
//   return `<p class="circle ${params}">${params}</p>`;
// }

// function getTypeCircleDouble(params) {
//   return `<p class="circle ${params[0]}">${params[0]}</p>
//           <p class="circle ${params[1]}">${params[1]}</p>`;
// }
