const element = 9;

const content = document.getElementById('view');
content.classList.add('hidden');

const content1 = document.getElementById('view-music');
content1.classList.add('hidden');

const elem = document.querySelector('form');
elem.classList.remove('others');

const body = document.querySelector('body');
body.classList.add('scroll');

const id = 'c7aadf942dc94023a48a7c595735e190';
const secret = '0275c7a2ec054368b6c3556286392244';
const api_endpoint_token = 'https://accounts.spotify.com/api/token';

function getToken(json)
{
	token = json.access_token;
    console.log(json);
}

let token;
fetch(api_endpoint_token,
{
    method: "post",
    body: 'grant_type=client_credentials',
    headers:
    {
     'Content-Type': 'application/x-www-form-urlencoded',
     'Authorization': 'Basic ' + btoa(id + ':' + secret)
    }
}).then(onResponse).then(getToken);

function onFocus()
{
  const text = document.getElementById('content');
  text.value = '';
}

function search(event)
{
    body.classList.remove('scroll');
    elem.classList.add('others');

	event.preventDefault();
	const element = document.querySelector('#content').value;
  
	if(element) {
	    const text = encodeURIComponent(element);
		console.log('Ricerca per : ' + text);
  
		const tipo = document.querySelector('#tipo').value;
		console.log('Ricerco elementi di tipo: ' + tipo);

		if(tipo === "Ricette") {
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
                    'X-RapidAPI-Key': '63083d612bmsh68887c8b28ea981p15fbe4jsn65fc514f73ab'
                }
            }
            fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=' + text + '&addRecipeInformation=true', options
            ).then(onResponse).then(onJson_recipe);
		}
        else if(tipo === 'Playlist'){
            fetch("https://api.spotify.com/v1/search?type=playlist&q=" + text,
            {
                headers:
                {
                    'Authorization': 'Bearer ' + token
                }
            }).then(onResponse).then(onJson_search);
		}
	}
	else {
		alert("Inserisci il testo per cui effettuare la ricerca");
	}
}

function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
}

function onJson_recipe(json) {
    content.classList.remove('hidden');
    const library1 = document.getElementById('view-music');
    library1.innerHTML = '';
    console.log('JSON ricevuto');
    console.log(json);
    const library = document.getElementById('view');
    library.innerHTML = '';
    
    const value = json.results;

    if(value.length == 0)
    {
      const errore = document.createElement("h1"); 
      const messaggio = document.createTextNode("Nessun risultato!"); 
      errore.appendChild(messaggio); 
      library.appendChild(errore);
    }
  
    for(const values of value)
    {
      const immagine = values.image;
      const text = values.title;
      const l = values.sourceUrl;
      const testo = 'Go to recipe';
      const sum = values.summary;
  
      const album = document.createElement('div');
      album.classList.add('album');

      const img = document.createElement('img');
      img.src = immagine;

      const div = document.createElement('div');
      div.classList.add('div');

      const title = document.createElement('h1');
      title.textContent = text;

      const parag = document.createElement('p');
      parag.classList.add('p');
      const testo_mod = sum.replace(/(r\n|\r|\n)/g, '<br>');
      parag.innerHTML = testo_mod;

      const link = document.createElement('a');
      link.href = l;
      link.textContent = testo
      link.classList.add('link');
      
      album.appendChild(img);
      album.appendChild(div);
      div.appendChild(title);
      div.appendChild(parag);
      div.appendChild(link);
      
      library.appendChild(album);
    }
}


function onJson_search(json){
    content1.classList.remove('hidden');
    const library1 = document.getElementById('view');
    library1.innerHTML = '';
    console.log('JSON ricevuto');
    console.log(json);
    const library = document.getElementById('view-music');
    library.innerHTML = '';
    
    const value = json.playlists.items;
    let num_results = value.length
    
    if(value.length == 0)
    {
      const errore = document.createElement("h1"); 
      const messaggio = document.createTextNode("Nessun risultato!"); 
      errore.appendChild(messaggio); 
      library.appendChild(errore);
    }

    if(num_results > 10){
        num_results = 9;
    }
  
    for(let i=0; i<num_results; i++)
    {
      const playlist_elem = value[i];

      const immagine = playlist_elem.images[0].url;
      const text = playlist_elem.name;
      const l = playlist_elem.external_urls;
      const link = l.spotify 
      const testo = 'Go to tracks';

      const album = document.createElement('div');
      album.classList.add('playlist');

      const div = document.createElement('div');
      div.classList.add('div-img');

      const div1 = document.createElement('div');
      div1.classList.add('div');

      const img = document.createElement('img');
      img.src = immagine;

      const title = document.createElement('h1');
      title.classList.add('text');
      title.textContent = text;
      
      const spot = document.createElement('a');
      spot.href = link;
      spot.textContent = testo
      spot.classList.add('link');

      album.appendChild(div);
      album.appendChild(div1);
      div.appendChild(img);
      div1.appendChild(title);
      div1.appendChild(spot);
      
      library.appendChild(album);
    }
}

const form = document.querySelector('.element');
form.addEventListener('submit', search);

const text = document.querySelector("input")
text.addEventListener("focus", onFocus);