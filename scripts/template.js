function getPokemonTemplate(id, name, sprite, types, bg, url) {
    return `<div onclick="getPokeSpeciesData('${url}')"
        class="pokemon_container site_padding top_bottom_padding ${bg} type_container curser_pointer"
      >
        <span class="poke_id">#${id}</span>
        <span class="poke_name">${name}</span>
        <img class="poke_sprite" src="${sprite}" alt="Bisa" />
        <span class="types_container">${types}</span>
      </div>`;
}

function getPokemonDetailsTemplate(id, name, sprite, types, pokeCry, weight, eggGroup, pokeStats, evoChain) {
  return `
    <div class="pokemon_details">
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
    </div>`;
}