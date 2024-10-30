let DB_URL = "https://pokeapi.co/api/v2/";
let allPokemon = [];
let allPokemonNames = [];

let offset = 0;
let limit = 10;

function init(){
    fetchData();
    getNames();
}

async function fetchPokeData(url){
    let response = await fetch(url);
    return await response.json();
}

async function fetchData(path = ""){
    let response = await fetch(DB_URL + path);
    return await response.json();
  }

// async function getNames() {
//     let namesResponse = await fetchData(`/pokemon/?offset=${offset}&limit=${limit}`);
//     let names = await namesResponse.results;

//     for (let i = 0; i < names.length; i++) {
//         const element = names[i];
//         let pokeData = await fetchPokeData(element.url)
//         pokeData.name = capitalizeFirstLetter(pokeData.name);
//         allPokemon.push(pokeData);
//         document.getElementById('content').innerHTML += card(pokeData, i);
//     }
//   }

async function getNames(filter = "") {
    let namesResponse = await fetchData(`/pokemon/?offset=${offset}&limit=${limit}`);
    let names = await namesResponse.results;
    allPokemon = [];
    document.getElementById('content').innerHTML = '';
    allPokemonNames.push(names);

    for (let i = 0; i < names.length; i++) {
        const element = names[i];
        let pokeData = await fetchPokeData(element.url);
        pokeData.name = capitalizeFirstLetter(pokeData.name);
        allPokemon.push(pokeData);
      
        if (filter === "" || pokeData.name.toLowerCase().includes(filter.toLowerCase())) {
            document.getElementById('content').innerHTML += card(pokeData, i);
        }
    }
}

// Diese Funktion wird aufgerufen, wenn sich das Suchfeld ändert
function searchPokemon() {
    let filter = document.getElementById('search').value;
    if (filter.length >= 3) {
        getNames(filter); // Namen mit Suchbegriff filtern
    } else if (filter.length === 0){
        getNames(); // Alle Namen anzeigen, wenn weniger als 3 Zeichen eingegeben wurden
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function card(pokemon, index){
    return getCardTemplate(pokemon, index);
}

function openOverlay(index){
    let overlay = document.getElementById('overlay');
    if (overlay.classList.contains('d-none')) {
        // renderStats(index);
        bigCardImg(index);
        showStatsTab(index);
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

function loadMorePokemon(){
    limit = limit + 20;
    document.getElementById('content').innerHTML = '';
    init();
}

function showStatsTab(index){
    let pokemon = allPokemon[index];
    document.getElementById('nav-home').innerHTML = statsTab(pokemon);
}