function overviewTemplate(pokeIndex){
    let firstType = allPokemon[pokeIndex].type[0];
    let secType = allPokemon[pokeIndex].type[1];
    return  `<div class="card m-4" onclick="getEvolutionData(${pokeIndex})" id="pokemon_${pokeIndex}">
                <div class="cardHeader text-capitalize p-2">${allPokemon[pokeIndex].Name}</div>
                <div id="imgContainer" class="${firstType}">           
                    <img src="${allPokemon[pokeIndex].Img}" class="cardPokeImg mx-auto" alt="${allPokemon[pokeIndex].Name}">
                </div>
                <div class="cardFooter p-4">
                    <div class="typeContainer">
                        <div class="text-capitalize" id="firstType">${firstType}</div>
                        <img class="typeImg"  src="img/typesImg/${firstType}.png" alt="${firstType}">
                    </div>
                    ${secType ? `
                        <div class="typeContainer">
                            <div class="text-capitalize" id="secType">${secType}</div>
                            <img class="typeImg" src="img/typesImg/${secType}.png" alt="${secType}">
                        </div>` : ''}
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

function aboutTab(pokemon){
    return `
    <p>Spezies:</p>${pokemon.species}`;

}

function evolutionChainTab(evolutionDataArr, i){
    return `<div class="evoPic"><img src="${evolutionDataArr[i].imageUrl}" alt="pokemonImg"></div>
`;
}