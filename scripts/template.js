function getPokemonTemplate(i, data, types) {
  return `
   <div class="card" style="width: 12rem">
                  <h3>
                    <span> #${i+1} ${data.results[i].name} </span>
                  </h3>
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
