let DB_URL = "https://pokeapi.co/api/v2/";
let allPokemon = [];
let currentIndex=[];
let species = [];
let evolutionDataArr = [];

let offset = 0;
let limit = 20;

// function init(){
//     fetchData();
//     getNames();
// }

// async function fetchPokeData(url){
//     let response = await fetch(url);
//     return await response.json();
// }

// async function fetchData(path = ""){
//     let response = await fetch(DB_URL + path);
//     return await response.json();
//   }

// async function fetchEvolution(currentIndex) {
//     let url = allPokemon[currentIndex].species.url;
//     const response = await fetch(url);
//     const json = await response.json();
    
//     fetchEvolutionChain(json);     
// }

// async function fetchEvolutionChain(json){
//     let url = json.evolution_chain.url;
//     getEvolutionData(url);
// }

// async function getEvolutionData(url){
//     let response = await fetch(url);
//     let data = await response.json();
//     let chain = data.chain;
//     // console.log(chain);
//     const evolutionDataArr = [];
        
//         function extractEvolutionDetails(chainLink) {
//             const pokemonName = chainLink.species.name;
//             const pokemonId = chainLink.species.url.split('/').slice(-2, -1)[0];
//             const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;
          
//             evolutionDataArr.push({ name: pokemonName, imageUrl: pokemonImageUrl });
//             chainLink.evolves_to.forEach(nextEvolution => extractEvolutionDetails(nextEvolution));
//         }
//         extractEvolutionDetails(chain);
//             // const pokemonEvolution = evolutionDataArr[i];
//             showEvolutionChainTab(evolutionDataArr);     
//     console.log(evolutionDataArr);
// }


// async function getNames(filter = "") {
//     let namesResponse = await fetchData(`/pokemon/?offset=${offset}&limit=${limit}`);
//     let names = await namesResponse.results;
//     allPokemon = [];
//     document.getElementById('content').innerHTML = '';

//     for (let i = 0; i < names.length; i++) {
//         const element = names[i];
//         let pokeData = await fetchPokeData(element.url);
//         pokeData.name = capitalizeFirstLetter(pokeData.name);
//         allPokemon.push(pokeData);
      
//         if (filter === "" || pokeData.name.toLowerCase().includes(filter.toLowerCase())) {
//             document.getElementById('content').innerHTML += card(pokeData, i);
//         }
//     }
//     setTimeout(() => document.getElementById('spinnerContainer').classList.add('d-none'), 1000);
// }





function searchPokemon() {
    let searchWord = document.getElementById('search').value;
    if (searchWord.length >= 3) {
        getNames(searchWord);
    } else if (searchWord.length === 0){
        getNames();
    }
}
//////////////////// wird nicht mehr benötigt /////////////////////////
// function capitalizeFirstLetter(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1);
// }
///////////////////////////////////////////////////////////////////////

function card(pokemon, index){
    return getCardTemplate(pokemon, index);
}

function openOverlay(index){
    currentIndex = index;
    let overlay = document.getElementById('overlay');
    if (overlay.classList.contains('d-none')) {
        renderPokemon();
    }
    overlay.classList.toggle('d-none');
}

function renderPokemon(){
    bigCardImg(currentIndex);
    showStatsTab(currentIndex);
    showAbilitiesTab(currentIndex);
    calculatePokemonHight(currentIndex);
    fetchEvolution(currentIndex);
}

function renderStats(index){
    let pokemon = allPokemon[index];
    document.getElementById('stats').innerHTML = getStatsTemplate();
}

function bigCardImg(index) {
    let pokemon = allPokemon[index];
    document.getElementById('bigCardImg').innerHTML = `
        <img class="bigCardImg" src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
    `;
}

function loadMorePokemon(){
    limit = limit + 10;
    document.getElementById('content').innerHTML = '';
    init();
}

function showAboutTab(index){
    let pokemon = allPokemon[index];
    document.getElementById('about-stats').innerHTML = aboutTab(pokemon);
}

function showStatsTab(index){
    let pokemon = allPokemon[index];
    document.getElementById('nav-stats').innerHTML = statsTab(pokemon);
}

function showAbilitiesTab(index){
    let pokemon = allPokemon[index];
    document.getElementById('nav-profile').innerHTML = abilitiesTab(pokemon);
}

function showEvolutionChainTab(evolutionDataArr, i){
    document.getElementById('nav-contact').innerHTML = '';
    for (let i = 0; i < evolutionDataArr.length; i++) {
        document.getElementById('nav-contact').innerHTML += evolutionChainTab(evolutionDataArr, i);   
    }    
}

function nextPokemon(){
    if (currentIndex < allPokemon.length - 1){
        currentIndex++;
        renderPokemon();
    }
}

function prevPokemon(){
    if (currentIndex > 0){
        currentIndex--;
        renderPokemon();
    }
}

function calculatePokemonHight(pokemon){
    let height = (pokemon.height / 10).toFixed(2);
    return height;
}