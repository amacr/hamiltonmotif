// Se declaran variables globales
var jsonurl = "js/datos.json"
var misdatos ="";
var sidebar = document.getElementById("sidebar-content");
var playerSpotify = document.getElementById("player");
var vizArc = document.getElementById("arc-viz");


// Carga los datos del jason en "misdatos"
document.addEventListener("DOMContentLoaded", function api() {
    fetch( jsonurl )
    .then(res => res.json())
    .then(data => {
        misdatos = data;
    });
});



// Borra el contenido dinámico anterior
var resetCanvas = function () {
    sidebar.innerHTML = "";
    vizArc.className = "";

};



// función para obtener los datos del json
var createContent = function(el) {
    // obtiene el id de la clase para buscar en el json
    const jsonId = el.className.replace("motif ", "");

    // valida que la clase pertenezca al motif correspondiente
    for (var i = 0; i < misdatos.motifs.length; ++i) {
        var currentMotif = misdatos.motifs[i];
        if (currentMotif.id == jsonId) {
            //Función que musetra los contenidos del json
            mostrar(i);

            // Funcion para poner color a los arcos de los motifs correspondientes
            paintArc(currentMotif.id);
        }

    }
};


//función que agrega una clase "active" a los arcos del motif seleccionado. 
function paintArc (y) {
    resetArcClass(); 
    const arcClass = document.getElementsByClassName(y);
    for (let i=0; i < arcClass.length; i++){
        //const arcClassCheck = "arc";
        if (arcClass[i].classList.contains("arc")){
            arcClass[i].classList.add("active");
            }
    }
};

function resetArcClass () {
    const arcClassActive = document.querySelectorAll('g.active');
        for (let i=0; i < arcClassActive.length; i++){
            arcClassActive[i].classList.remove("active");
    }
}

// Agrega un EventListener para que cada motif muestre datos al hacer clic
var addEventListenersMotif = function() {
    // arreglo con todos los elementos que tienen clase motif
    const motifElements = document.querySelectorAll(".motif");

    // Se agrega el EventListener a cada elemento
    for (let i = 0; i < motifElements.length; i++) {
        let item = motifElements[i];
        item.addEventListener('click', function(){
            createContent(this);
        });
    }


};

// Crea una canción del listado.
var buildSong = function(llave, i) {

    // Se llama la canción en el json
    let songData = llave.songs[i];

    // Se crea el elemento li con el nombre
    const song = document.createElement("li");
    song.innerHTML = songData.song_name;

    /* Sólo si tiene url de Spotify se agrega comportamiento y atributos */
    if (typeof songData.uri_spotify != undefined && songData.uri_spotify.indexOf("spotify.com") != -1) {
        song.setAttribute("song", songData.uri_spotify);
        song.addEventListener('click', function(){
            playerSpotify.src =songData.uri_spotify;
            console.log(songData.uri_spotify)
        });
        song.classList.add ("song");
    }

    return song;
};



// Construye el contenido dinámico y lo presenta en pantalla.
var mostrar = function (x) {
    // llave permite acceder al listado de atributos del motif
    var llave = misdatos.motifs[x];

    // Se elimina de pantalla los datos dinámicos
    resetCanvas(); 

    // Se crea un div con la clase del motif y se agrega a contenido dinámico
    var contenidos = document.createElement("div");
    contenidos.classList.add (llave.class);
    sidebar.appendChild(contenidos);
    
    // Se crea un elemento de título con el nombre del motif y se agrega el contenido
    var leitmotif = document.createElement("h2");
    leitmotif.innerHTML = "Leitmotif: "+llave.name;
    contenidos.appendChild(leitmotif);

    // Se agrega la descripción del personaje y se agrega al contenido
    var character = document.createElement("h3");
    character.innerHTML = "Personaje: "+llave.character;
    contenidos.appendChild(character);

    // Se agrega la descripción del motif y se agrega al contenido
    var motifText = document.createElement("div");
    motifText.innerHTML = llave.texto_motif;
    contenidos.appendChild(motifText);

    // Se agrega un subtítulo para el listado de canciones
    var songs = document.createElement("h3");
    songs.innerHTML = "Canciones: ";
    contenidos.appendChild(songs);

    var songsText = document.createElement("p");
    songsText.innerHTML = "Haz clic en una canción para cargarla en el player y escuchar el motif (requiere estar logueado en una cuenta de Spotify en el navegador para escucharlas todas).";
    contenidos.appendChild(songsText);

    // Se crea el listado de canciones
    var songList = document.createElement("ul");
    contenidos.appendChild(songList);
    playerSpotify.src =llave.songs[0].uri_spotify;
    for (i=0; i < llave.songs.length; i++) {
        songList.appendChild(buildSong(llave, i));
    };

    // Se agrega clase personaje a div arc
    vizArc.classList.add (llave.class);
    
};

// Se ejecuta la función para llamar a toda la funcionalidad
addEventListenersMotif();

//Controlador slideshow header
let currentIndex = 1;

function moveSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    
    // Quitar clase active
    slides[currentIndex - 1].classList.remove('active');
    dots[currentIndex - 1].classList.remove('active');
    
    // Calcular nuevo índice
    currentIndex += direction;
    
    if (currentIndex > slides.length) {
        currentIndex = 1;
    } else if (currentIndex < 1) {
        currentIndex = slides.length;
    }
    
    // Agregar clase active
    slides[currentIndex - 1].classList.add('active');
    dots[currentIndex - 1].classList.add('active');
}

function currentSlide(n) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    
    slides[currentIndex - 1].classList.remove('active');
    dots[currentIndex - 1].classList.remove('active');
    
    currentIndex = n;
    
    slides[currentIndex - 1].classList.add('active');
    dots[currentIndex - 1].classList.add('active');
}

// Auto-play opcional (cada 5 segundos)
/*setInterval(() => {
    moveSlide(1);
}, 5000);*/
