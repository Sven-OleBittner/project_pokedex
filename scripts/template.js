function getPokemonTemplate(i, data, types) {
  return `
   <div class="card" style="width: 12rem">
                  <h4 class="card-title">
                    <span class="poke_name"> #${i+1} ${data.results[i].name} </span>
                  </h4>
                  <img
                    src="./sprites/sprites/pokemon/${i + 1}.png"
                    class="card-img-top"
                    alt="${data.results[i].name}"
                  />
                  <div class="card-body">
                    <p class="card-text">
                    types: ${types.join(", ")}
                    </p>
                  </div>
                </div>`;
}
