const formulario = document.querySelector('#formulario');
const pelicula = document.querySelector('#pelicula');

// formulario
const nombrePelicula = formulario.children[2].children[0]; //input
const urlPelicula = formulario.children[3].children[0]; // input url
const boton = formulario.children[4]; //boton
const botonLimpiar = formulario.children[5]; //boton Limpiar
const condicion = formulario.children[6]; //condicion



let peliculas =[];

document.addEventListener('DOMContentLoaded', ()=>{

    peliculas = JSON.parse(localStorage.getItem('pelicula') || []);
    console.log(peliculas);
    peliculaAdd();
});

function peliculaAdd(){

    // limpiar dom mas optimizado

    while( pelicula.firstChild){
        pelicula.removeChild(pelicula.firstChild);
    }

    peliculas.forEach(element => {
        const peliTitulo = element.nombre;
        const peliUrls = element.url;

        const div = document.createElement('div');
        div.className = 'pelicula';
        
        const imgPeli = document.createElement('img');
        imgPeli.src = peliUrls;
        const titlePeli = document.createElement('span');
        titlePeli.textContent = peliTitulo;

        div.appendChild(imgPeli)
        div.appendChild(titlePeli)
        
        pelicula.appendChild(div)
        
    });;

    localStorages(); 
    
}

function localStorages(){
     //Solicitar local Storage

    localStorage.setItem('pelicula', JSON.stringify( peliculas ) );
}

boton.addEventListener('click', ()=>{ 
    conditionInput();
   
    limpiarInputs();
});


function conditionInput () {

    // conficion input vacio 
    if (nombrePelicula.value.length == 0 && urlPelicula.value.length == 0){
        condicion.textContent = 'disculpe inputs vacios';
        condicion.style.backgroundColor = 'red';
        tiempoCondicion();

    }else if(nombrePelicula.value.length == 0){
        condicion.textContent = 'Disculpe digite un nombre de pelicula';
        condicion.style.backgroundColor = 'red';
        tiempoCondicion();

    }else if(urlPelicula.value.length == 0){
        condicion.textContent = 'Disculpe digite una Url imagen de pelicula';
        condicion.style.backgroundColor = 'red';
        tiempoCondicion();

    }else{
        condicion.textContent = 'Enviado satisfactoriamente';
        condicion.style.backgroundColor = 'green';
        tiempoCondicion();
        
         // value
        const nombrePeli = nombrePelicula.value;
        const urlPeli = urlPelicula.value;

        const peliculaInfo = {
            nombre : nombrePeli,
            url : urlPeli,
        }

        peliculas.push(peliculaInfo)
        peliculaAdd();
    }
}


function limpiarInputs() {
    nombrePelicula.value = '';
    urlPelicula.value = '';
}


function tiempoCondicion(){
    setTimeout(()=>{
        condicion.textContent = '';   
        condicion.style.backgroundColor = 'transparent';  
    },3000);
    
}



botonLimpiar.addEventListener('click', limpiarInputs)