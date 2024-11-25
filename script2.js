let DB_URL = "https://pokeapi.co/api/v2/";
allPokemon = [];
selectedPokemon = [];
currentIndex = null;
let offset = 0;
let limit = 20;
let debounceTimeout;
let evolutionDataArr = [];


async function init(){
    await loadAllPokemon();

}


async function loadAllPokemon(filter = ""){
    document.getElementById('spinnerContainer').classList.remove('d-none');
    try {
        let response = await fetch(DB_URL + `/pokemon/?offset=${offset}&limit=${limit}`);
        let responseAsJson = await response.json();
        for (let index = 0; index < responseAsJson.results.length; index++) {
            const pokeName = responseAsJson.results[index].name;
            const pokeUrl = responseAsJson.results[index].url;
            let response = await fetch(pokeUrl);
            let pokemonDetails = await response.json();
            let pokeId = pokemonDetails.id;
            let pokeTypes = pokemonDetails.types.map(typeInfo => typeInfo.type.name);
            let pokeImg = pokemonDetails.sprites.other['dream_world'].front_default;
            pushPokemonToArray(pokeName, pokeUrl, pokeId, pokeTypes, pokeImg); 
        }  
    }
    catch (error) {
        console.error("das hat nicht geklappt");
    }
    document.getElementById('spinnerContainer').classList.add('d-none');
}

function openOverlay(pokeIndex){
    currentIndex = pokeIndex;
    let body = document.getElementById('body');
    let overlay = document.getElementById('overlay');
    if (overlay.classList.contains('d-none')) {
        renderPokemonDetailCard(pokeIndex);
    }
    body.classList.toggle('overflowHidden');
    overlay.classList.toggle('d-none');
}

async function getSinglePokemon(pokeIndex){
    let response = await fetch(allPokemon[pokeIndex].url);
    let pokemonDetails = await response.json();
    
    let base = pokemonDetails.base_experience;
    let pokeHeight = pokemonDetails.height;
    let pokeWeight = pokemonDetails.weight;
    let id = pokemonDetails.id;
    let evolution = pokemonDetails.species.url;
    let stats = pokemonDetails.stats;
    updatePokemon(base, pokeHeight, pokeWeight, id, evolution, stats);
    getEvolutionData(evolution);
}


function updatePokemon(base, pokeHeight, pokeWeight, id, evolution, stats) {
    let newData = {
        "base": base,
        "height": pokeHeight,
        "weight": pokeWeight,
        "evolution": evolution,
        "stats" : stats
    }
    let pokeUpdate = allPokemon.find(pokemon => pokemon.ID === id);
    if (pokeUpdate) {
        Object.assign(pokeUpdate, newData);
    }
}

function pushPokemonToArray(pokeName, pokeUrl, pokeId, pokeTypes, pokeImg){
    allPokemon.push(
        {
            "Name": pokeName,
            "ID" : pokeId,
            "url" : pokeUrl,
            "type" : pokeTypes,
            "Img" : pokeImg
        }   
    )  
    renderPokemonsOverview();
}

function renderPokemonsOverview(){
    let allpokemon = allPokemon;
    document.getElementById('content').innerHTML = '';
    for (let pokeIndex = 0; pokeIndex < allpokemon.length; pokeIndex++) {
        const element = allpokemon[pokeIndex];
        document.getElementById('content').innerHTML += overviewTemplate(pokeIndex);
    }
}

function loadMorePokemon(){
    limit = limit + 10;
    allPokemon = [];
    document.getElementById('content').innerHTML = '';
    init();
}

function searchPokemon() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        let searchWord = document.getElementById('search').value.toLowerCase();
        if (searchWord === "") {
            renderPokemonsOverview();
            return;}
        if (searchWord.length > 2) {
            let searchedPoke = allPokemon.filter(poke => poke.Name && poke.Name.toLowerCase().includes(searchWord));
            viewSearchedPokemon(searchedPoke);
        }   
}, 300);
}

function viewSearchedPokemon(searchedPoke) {
    let content = document.getElementById('content');
    content.innerHTML = '';
    for (let poke of searchedPoke) {
        content.innerHTML += overviewTemplate(poke.ID-1);
    }
}

function renderPokemonDetailCard(pokeIndex){
    bigCardImg(pokeIndex);
    getSinglePokemon(pokeIndex);
    setTimeout(() => showAboutTab(pokeIndex), 50);
    setTimeout(() => showStatsTab(pokeIndex), 50);
}

function bigCardImg(index) {
    let pokemon = allPokemon[index];
    document.getElementById('bigCardImg').innerHTML = `
        <img class="bigCardImg" src="${pokemon.Img}" alt="${pokemon.name}">
    `;
}

function showAboutTab(pokeIndex){
    let pokemon = allPokemon[pokeIndex];
    document.getElementById('nav-about').innerHTML = aboutTab(pokemon);
}

function showStatsTab(pokeIndex){
    let pokemon = allPokemon[pokeIndex];
    document.getElementById('nav-stats').innerHTML = statsTab(pokemon);
}

function nextPokemon(){
    if (currentIndex < allPokemon.length - 1){
        currentIndex++;
        renderPokemonDetailCard(currentIndex);
    }
}

function prevPokemon(){
    if (currentIndex > 0){
        currentIndex--;
        renderPokemonDetailCard(currentIndex);
    }
}

function showEvolutionChainTab(evolutionDataArr, i){
    document.getElementById('evoTab').innerHTML = '';
    for (let i = 0; i < evolutionDataArr.length; i++) {
        document.getElementById('evoTab').innerHTML += evolutionChainTab(evolutionDataArr, i);   
    }    
}

async function getEvolutionData(url){
    let response = await fetch(url);
    let data = await response.json();
    let evoData = data.evolution_chain.url;
    let getDataChain = await fetch(evoData);
    let dataChain = await getDataChain.json();
    let dataChainEvo = dataChain.chain;
    const evolutionDataArr = [];
        function extractEvolutionDetails(dataChainEvo) {
            let pokemonName = dataChainEvo.species.name;
            let pokemonId = dataChainEvo.species.url.split('/').slice(-2, -1)[0];
            let pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;
            evolutionDataArr.push({ name: pokemonName, imageUrl: pokemonImageUrl });
                if (dataChainEvo.evolves_to && dataChain.chain.evolves_to.length > 0) {
                    dataChainEvo.evolves_to.forEach(nextEvolution => extractEvolutionDetails(nextEvolution));
                }
    }
    extractEvolutionDetails(dataChainEvo);
    showEvolutionChainTab(evolutionDataArr);     
}

