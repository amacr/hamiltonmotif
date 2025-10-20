/**
 * Variable global que se llena usando datos del json prueba.json.
 */
var misdatos ="";



/**
 * Variable global que representa elemento DOM donde aparecen datos dinamicos.
 */
var sidebar = document.getElementById("sidebar-content");



/**
 * Variable global que representa elemento DOM usado para iframe player.
 */
var playerSpotify = document.getElementById("player");


/**
 * Al cargarse el DOM carga los datos del json.
 * @var jsonurl
 * La variable jsonurl está en el html.
 * @var misdatos
 * El resultado de la llamada se guarda en la variable misdatos.
 */
document.addEventListener("DOMContentLoaded", function api() {
    fetch( jsonurl )
    .then(res => res.json())
    .then(data => {
        misdatos = data;
    });
});



/**
 * Borra el contenido dinámico de la pantalla.
 */
var resetCanvas = function () {
    sidebar.innerHTML = "";
};



/**
 * Del elemento "el" obtiene y muestra los datos del motif 
 * @param {HTMLElement} el
 */
var createContent = function(el) {
    /* obtiene el id para buscar en el json */
    const jsonId = el.className.replace("motif ", "");

    /** 
     * recorre el json y si encuentra el elemento de id jsonId
     * entonces muestra el elemento.
     */
    for (var i = 0; i < misdatos.motifs.length; ++i) {
        var currentMotif = misdatos.motifs[i];
        if (currentMotif.id == jsonId) {
            mostrar(i);
        }
    }
};



/**
 * Agrega un EventListener para cada motif.
 * Si se hace click sobre el elemento entonces se crea el
 * contenido y se muestra en pantalla.
 */
var addEventListenersMotif = function() {
    /* arreglo con todos los elementos que tienen clase motif */
    const motifElements = document.querySelectorAll(".motif");

    /* Se agrega el EventListener a cada elemento */
    for (let i = 0; i < motifElements.length; i++) {
        let item = motifElements[i];
        item.addEventListener('click', function(){
            createContent(this);
        });
    }


};



/**
 * Crea una canción del listado.
 * 
 * @param {array} llave
 * - Arreglo con el listado de datos.
 * @param {*} i 
 * - Índice de la canción dentro del listado.
 * @returns
 * - devuelve un elemento HTML que representa la canción.
 */
var buildSong = function(llave, i) {
    /* variable que almacena la canción específica del listado */
    let songData = llave.songs[i];

    /* Variable que almacena el elemento de la canción */
    /* En este caso, es un "li" dentro de un listado */
    const song = document.createElement("li");
    song.innerHTML = songData.song_name;

    /* Sólo si tiene url de Spotify se agrega comportamiento y atributos */
    if (typeof songData.uri_spotify != undefined && songData.uri_spotify.indexOf("spotify.com") != -1) {
        song.setAttribute("song", songData.uri_spotify);
        song.addEventListener('click', function(){
            playerSpotify.src =songData.uri_spotify;
        });
        song.classList.add ("song");
    }

    return song;
};



/**
 * Construye el contenido dinámico y lo presenta en pantalla.
 * @param {Int} x
 * - Índice del motif dentro del arreglo de motifs.
 */
var mostrar = function (x) {
    /* llave es el listado de atributos del motif */
    var llave = misdatos.motifs[x];

    /* Se elimina de pantalla los datos dinámicos */
    resetCanvas(); 

    /* Se crea un div con la clase del motif y se agrega a 
    contenido dinámico */
    var contenidos = document.createElement("div");
    contenidos.classList.add (llave.class);
    sidebar.appendChild(contenidos);
    
    /* Se crea un elemento de título con el nombre del motif
    y se agrega el contenido */
    var leitmotif = document.createElement("h2");
    leitmotif.innerHTML = "Leitmotif: "+llave.name;
    contenidos.appendChild(leitmotif);
    
    /* Se agrega la descripción del motif y se agrega al contenido */
    var motifText = document.createElement("p");
    motifText.innerHTML = "Leitmotif: "+llave.texto_motif;
    contenidos.appendChild(motifText);

    /* Se agrega la descripción del personaje y se agrega al contenido */
    var character = document.createElement("h3");
    character.innerHTML = "Personaje: "+llave.character;
    contenidos.appendChild(character);

    /* Se agrega un subtítulo para el listado de canciones */
    var songs = document.createElement("h3");
    songs.innerHTML = "Canciones: ";
    contenidos.appendChild(songs);

    /* Se crea el listado de canciones */
    var songList = document.createElement("ul");
    contenidos.appendChild(songList);
    playerSpotify.src =llave.songs[0].uri_spotify;
    for (i=0; i < llave.songs.length; i++) {
        songList.appendChild(buildSong(llave, i));
    };    
};



/* Se ejecuta la función para llamar a toda la funcionalidad */
addEventListenersMotif();