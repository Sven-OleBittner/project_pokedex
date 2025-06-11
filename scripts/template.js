function getPokemonTemplate(pokeIndex) {
    return `<div onclick="getPokeSpeciesData('${pokeList[pokeIndex].url}')"
        class="pokemon_container site_padding top_bottom_padding ${pokeList[pokeIndex].bg} type_container curser_pointer"
      >
        <span class="poke_id">#${pokeList[pokeIndex].id}</span>
        <span class="poke_name">${pokeList[pokeIndex].name}</span>
        <img class="poke_sprite" src="${pokeList[pokeIndex].sprite}" alt="Bisa" />
        <span class="types_container">${pokeList[pokeIndex].types}</span>
      </div>`;
}

function getPokemonDetailsTemplate(id, name, sprite, types, pokeCry, weight, eggGroup, pokeStats, evoChain) {
  return `
    <div class="pokemon_details_nav">
     <div class="nav-arrows-row ">
    <button class="nav-arrow" onclick="showPrevPokemon(${id})">&#8592;</button>
    <button class="nav-arrow" onclick="showNextPokemon(${id})">&#8594;</button>
  </div>
      <button class="nav-arrow left" onclick="showPrevPokemon(${id})">&#8592;</button>
      <div class="pokemon_details_content">
        <h2>${name}</h2>
        <img src="${sprite}" alt="${name}" />
        <p>Types: ${types}</p>
        <p>Weight: ${weight} kg</p>
        <p>Egg Group: ${eggGroup}</p>
        <h3>Stats:</h3>
        <ul>
          ${pokeStats.map(stat => `<li>${stat.name}: ${stat.value}</li>`).join("")}
        </ul>
        <h3>Evolution Chain:</h3>
        <div class="evo-chain">${evoChain}</div>
        <button onclick="playCry('${pokeCry}')">Play Cry</button>
      </div>
      <button class="nav-arrow right" onclick="showNextPokemon(${id})">&#8594;</button>
    </div>
  `;
}