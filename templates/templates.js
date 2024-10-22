function getCardTemplate(pokemon, index){
    return  `<div class="card m-2" style="width: 18rem;" onclick="openOverlay(${index})">
                <h4 class="card-title">${pokemon.name}</h4>
                <div id="imgContainer" class="${pokemon.types[0].type.name}">           
                    <img src="${pokemon.sprites.other.dream_world.front_default}" class="card-img-top mx-auto pt-2" alt="...">
                </div>
                <div class="card-body">
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>    
                </div>
            </div>`
}

function getStatsTemplate(pokemon){
    return `
            <div class="progress-container">
    <span>Base-HP:</span>
    <div class="progress mt-3" role="progressbar" aria-valuenow="${pokemon.stats[0].base_stat}" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar" style="width: ${pokemon.stats[0].base_stat}%;"></div>
    </div>
</div>

<div class="progress-container">
    <span>Attack:</span>
    <div class="progress mt-3" role="progressbar" aria-valuenow="${pokemon.stats[1].base_stat}" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar" style="width: ${pokemon.stats[1].base_stat}%;"></div>
    </div>
</div>

<div class="progress-container">
    <span>Defense:</span>
    <div class="progress mt-3" role="progressbar" aria-valuenow="${pokemon.stats[2].base_stat}" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar" style="width: ${pokemon.stats[2].base_stat}%;"></div>
    </div>
</div>

<div class="progress-container">
    <span>Special Attack:</span>
    <div class="progress mt-3" role="progressbar" aria-valuenow="${pokemon.stats[3].base_stat}" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar" style="width: ${pokemon.stats[3].base_stat}%;"></div>
    </div>
</div>;`
}