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
    return getCardTemplate(pokemon, index);
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
    document.getElementById('stats').innerHTML = getStatsTemplate(pokemon);
}

function bigCardImg(index) {
    let pokemon = allPokemon[index];
    document.getElementById('bigCardImg').innerHTML = `
        <img class="bigCardImg" src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
    `;
}
