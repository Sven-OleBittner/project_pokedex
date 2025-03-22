function getPokemonTemplate(i, data, types) {
  return `
   <div class="card " style="width: 12rem">
                  <h4 class="card-title">
                    <span class="poke_name"> #${i+1} ${data.results[i].name} </span>
                  </h4>
                  <img
                    src="./sprites/sprites/pokemon/${i + 1}.png"
                    class="card-img-top ${types[0]}"
                    alt="${data.results[i].name}"
                  />
                  <div id="${i+1}cardBody" class="card-body d-flex font-weight-bold justify-content-center">
                    <p class="card-text">                    
                  </div>
                </div>`;
}

function getTypeCircleSingle(params) {
  return `<p class="circle ${params}">${params}</p>`;
}

function getTypeCircleDouble(params) {
  return `<p class="circle ${params[0]}">${params[0]}</p>
          <p class="circle ${params[1]}">${params[1]}</p>`;
}