function getPokemonTemplate(id, name, sprite, types, bg) {
    return `<div
        id="pokemonContainer"
        class="pokemon_container site_padding top_bottom_padding ${bg} type_container"
      >
        <span>ID : ${id}</span>
        <span>Name : ${name}</span>
        <img class="poke_sprite" src="${sprite}" alt="Bisa" />
        <span class="types_container">${types}</span>
      </div>`;
}