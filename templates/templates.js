function getCardTemplate(pokemon, index){
    return  `<div class="card m-4" style="width: 18rem; --bs-card-border-width:none;" onclick="openOverlay(${index})" id="pokemon_${index}>
                <h4 class="card-title text-center">${pokemon.name}</h4>
                <div id="imgContainer" class="${pokemon.types[0].type.name}">           
                    <img src="${pokemon.sprites.other.dream_world.front_default}" class="card-img-top mx-auto pt-2" alt="...">
                </div>
                <div class="card-body">
                    
                </div>
            </div>`
}

function statsTab(pokemon){ 
        return `
           <div class="progress-container">
                <span>Base-HP:</span>
                <div class="progress" role="progressbar" aria-valuenow="${pokemon.stats[0].base_stat}" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar" style="width: ${pokemon.stats[0].base_stat}%;"></div>
                </div>
            </div>

            <div class="progress-container">
                <span>Attack:</span>
                <div class="progress" role="progressbar" aria-valuenow="${pokemon.stats[1].base_stat}" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar" style="width: ${pokemon.stats[1].base_stat}%;"></div>
                </div>
            </div>

            <div class="progress-container">
                <span>Defense:</span>
                <div class="progress" role="progressbar" aria-valuenow="${pokemon.stats[2].base_stat}" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar" style="width: ${pokemon.stats[2].base_stat}%;"></div>
                </div>
            </div>

            <div class="progress-container">
                <span>Special Attack:</span>
                <div class="progress" role="progressbar" aria-valuenow="${pokemon.stats[3].base_stat}" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar" style="width: ${pokemon.stats[3].base_stat}%;"></div>
                </div>
            </div> `
}

function abilitiesTab(pokemon){
    return `
            <table class="table">
            <tbody>
                    <tr>
                    <td>Größe</td>
                    <td>${calculatePokemonHight(pokemon)} m</td>
                </tr>
                <tr>
                    <td>Gewicht</td>
                    <td>${pokemon.weight} kg</td>
                </tr>
                <tr>
                    <td>Basiserfahrung</td>
                    <td>${pokemon.base_experience}</td>
                </tr>
                <tr>
                    <td>Fähigkeit</td>
                    <td>${pokemon.abilities[0].ability.name}</td>
                </tr>
                </tbody>
            </table>`
}