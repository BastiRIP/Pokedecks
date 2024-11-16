let DB_URL = "https://pokeapi.co/api/v2/";
allPokemon = [];
let offset = 0;
let limit = 20;


async function init(){
    await loadAllPokemon();

}


async function loadAllPokemon(filter = ""){
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
}

function pushPokemonToArray(pokeName, pokeUrl, pokeId, pokeTypes, pokeImg){
    allPokemon.push(
        {
            "Name": pokeName,
            "ID" : pokeId,
            "url" : pokeUrl,
            // "base" : base,
            // "height" : pokeHeight,
            // "weight" : pokeWeight,
            "type" : pokeTypes,
            "Img" : pokeImg
        }   
    )  
    renderPokemonsOverview();
}

async function getEvolutionData(pokeIndex){
    try {
        let response = await fetch(allPokemon[pokeIndex].url);
        let responseEvolution = await response.json(); 
        console.log(responseEvolution);
    }
    catch (error) {
        console.error("irgendwas mit der Evolution klappt nicht")
    }
}


// let base = pokemonDetails.base_experience;
//             let pokeHeight = pokemonDetails.height;
//             let pokeWeight = pokemonDetails.weight;


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
    let searchWord = document.getElementById('search').value.toLowerCase();
    if (searchWord === "") {
        renderPokemonsOverview();
        return;
    }

    if (searchWord.length > 2) {
        let searchedPoke = allPokemon.filter(poke => poke.Name && poke.Name.toLowerCase().includes(searchWord));
        viewSearchedPokemon(searchedPoke);
    } else {}   
}

function viewSearchedPokemon(searchedPoke) {
    let content = document.getElementById('content');
    content.innerHTML = '';
    for (let poke of searchedPoke) {
        content.innerHTML += overviewTemplate(poke.ID-1);
    }
}

function openOverlay(pokeIndex){
    currentIndex = pokeIndex;
    let overlay = document.getElementById('overlay');
    if (overlay.classList.contains('d-none')) {
        renderPokemonDetailCard(pokeIndex);
    }
    overlay.classList.toggle('d-none');
}

function renderPokemonDetailCard(pokeIndex){
    bigCardImg(pokeIndex);
}

function bigCardImg(index) {
    let pokemon = allPokemon[index];
    document.getElementById('bigCardImg').innerHTML = `
        <img class="bigCardImg" src="${pokemon.Img}" alt="${pokemon.name}">
    `;
}

