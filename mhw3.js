const numelementi = 6;

//-------------------------------------
const album_key = "4aawyAB9vmqN3uQ7FjRGTy";
const playlist_key = "3cEYpjA9oz9GiPac4AsH4n";
const traccia_key = "11dFghVXANMlKmJXsNCbNl";
const album_api_endpoint = "https://api.spotify.com/v1/albums/";
const Playlist_api_endpoint = "https://api.spotify.com/v1/search?type=playlist&limit=6&include_external=audio";
const traccia_api_endpoint = "https://api.spotify.com/v1/search?type=track&limit=6&include_external=audio";
//--------------------------------------

function Json_music(json) {
    console.log(json);
    const library = document.querySelector('#img_album');
    library.innerHTML = '';
    if (json.status == 400) {
        const error = document.createElement('h1');
        const message = documen.createTextNode(json.detail);
        error.appendChild(message);
        library.appendChild(error);
        return;
    }

    const result = json.music;

    if (result.length == 0) {
        const errore = document.createElement("h1");
        const messaggio = document.createTextNode("Nessun risultato");
        errore.appendChild(messaggio);
        library.appendChild(errore);
    }

    for (result of results) {
        if (result.primary_photo != null) {
            const imm = result.primary_photo.medium;
            const album = document.createElement("div");
            album.classList.add("album");
            const img = document.createElement("img");
            img.src = imm;
            const i = document.createElement("h1");
            i.textContent = result.i.primary;

            img.addEventListener("click", aperturaModal);

            album.appendChild(img);
            album.appendChild(i);
            library.appendChild(album);
        }


    }
}

function onJson_album(json) {
    console.log("JSON ricevuto");

    console.log(json);
    const library = document.querySelector("#img_album");
    library.innerHTML = "";
    const result = json.hits;
    // const risultato=json.hits;
    if (risultato.length = 0) {
        const errore = document.createElement("h1");
        const messaggio = document.createTextNode("Errore");
        errore.appendChild(messaggio);
        library.appendChild(errore);
    }

    for (result of results) {
        const albu = result.largeImageURL;

        const i = doument.createElement = ("div");
        i.classList.add("album");
        const img = document.createElement("img");
        img.src = albu;

        img.addEventListener("click", aperturaModal);

        i.appendChild(img);
        library.appendChild(i);
    }
}


function onResponse(response) {
    console.log("Ricevuto");
    return response.json();
}



async function cerca(event) {

    event.preventDefault();

    const conten = document.querySelector("#cont").value;
    console.log(conten);
    if (conten) {
        const testo = encodeURIComponent(conten);
        const tipologia = document.querySelector("#genere").value;


        if (tipologia == "Album") {

            /* alb_request=album_api_endpoint + '?key=' + album_key+ '&q=' + testo + '&per_page=' + numelementi;
             console.log(alb_request);
             fetch(alb_request).then(onResponse).then(getToken);*/
            const token = await getToken();
console.log(token);

            const result = fetch(album_api_endpoint + '?key=' + album_key + '&q=' + testo + '&per_page=' + numelementi, {
                method: 'GET',
                headers: { 'Authorization': 'Bearer' + token }
            }).then((result) => result.json());

            /* const data = result.json(); */
            console.log(result);


        }
    }
}


function aperturaModal(event) {
    const immagine = document.createElement("img");
    immagine.id = "immagineP";

    immagine.src = event.currentTarget.src;

    modale.appendChild(immagine);
    modale.classList.remove("hidden");
    document.body.classList.add("no-scroll");
}



function chiusuraModal(event) {
    if (event.key == 'Enter') {
        modale.classList.add('hidden');
        img = modale.querySelector('img');
        img.remove();
        document.body.classList.remove('no-scroll');
    }
}


async function getToken() {
    const clientId = "b5e03b3341934b26818a909886669ed4";
    const clientSecret = "9666e93ea33f4615a888b83ddf412be6";
    const result = await  fetch('https://accounts.spotify.com/api/token', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'

        
    }).then((result) => result.json());

   
    return  result.access_token;

}


const form = document.querySelector('#ricerca');
form.addEventListener('submit', cerca);


const model = document.querySelector('#modale');
model.addEventListener('click', chiusuraModal);