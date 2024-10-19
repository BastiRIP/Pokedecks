let DB_URL = "https://pokeapi.co/api/v2/";

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
        
        document.getElementById('content').innerHTML += card(pokeData);
        console.log(pokeData);
        
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


function card(pokemon){
    return  `<div class="card m-2" style="width: 18rem;">
                <h4 class="card-title">${pokemon.name}</h5>
                <div id="imgContainer" class="${pokemon.types[0].type.name}">           
                    <img src="${pokemon.sprites.other.dream_world.front_default}" class="card-img-top mx-auto pt-2" alt="...">
                </div>
                <div class="card-body">
                    <p>${pokemon.types[0].type.name}</p>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>`
}


