let DB_URL = "https://pokeapi.co/api/v2/";
let allPokemon = [];

let offset = 0;
let limit = 20;

function init(){
    fetchData();
    getNames();
}

async function getNames() {
    let namesResponse = await fetchData(`/pokemon/?offset=${offset}&limit=${limit}`);
    let names = await namesResponse.results;
    console.log(names);

    for (let i = 0; i < names.length; i++) {
        const element = names[i];
        let pokeData = await fetchPokeData(element.url)
        allPokemon.push(pokeData);
        
        document.getElementById('content').innerHTML += card(pokeData, i); 
    }
  }

async function fetchPokeData(url){
    let response = await fetch(url);
    return await response.json();
}

async function fetchData(path = ""){
    let response = await fetch(DB_URL + path);
    return await response.json();
  }

function card(pokemon, index){
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

function openOverlay(index){
    let overlay = document.getElementById('overlay');
    if (overlay.classList.contains('d-none')) {
        renderStats(index);
        bigCardImg(index);
    }
    overlay.classList.toggle('d-none');
}

function renderStats(index){
    let pokemon = allPokemon[index];
    document.getElementById('stats').innerHTML = `
                    <div class="progress mt-2" role="progressbar" aria-valuenow="${pokemon.stats[0].base_stat}" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar" style="width: ${pokemon.stats[0].base_stat}%">Base-HP</div>
        </div>
        <div class="progress mt-2" role="progressbar" aria-valuenow="${pokemon.stats[1].base_stat}" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar" style="width: ${pokemon.stats[1].base_stat}%">Attack</div>
        </div>
        <div class="progress mt-2" role="progressbar" aria-valuenow="${pokemon.stats[2].base_stat}" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar" style="width: ${pokemon.stats[2].base_stat}%">Defense</div>
        </div>
        <div class="progress mt-2" role="progressbar" aria-valuenow="${pokemon.stats[3].base_stat}" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar" style="width: ${pokemon.stats[3].base_stat}%">Special Attack</div>
        </div>`;
}

function bigCardImg(index) {
    let pokemon = allPokemon[index];
    document.getElementById('bigCardImg').innerHTML = `
        <img src="${pokemon.sprites.other.dream_world.front_default}" class="card-img-top mx-auto pt-2" alt="${pokemon.name}">
    `;
}
