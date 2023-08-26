const api = '69d71375ddd39d3c7f811208fef47132';
function obtenerGenerosPeliculas() {
    const UrlApiPelicula = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api}`;
    fetch(UrlApiPelicula)
    .then(respuesta => respuesta.json())
    .then(datos => {
        const contenedor_pelicula = document.getElementById('container');

        datos.genres.forEach(genre => {
            const divContenedor = document.createElement('div');
            divContenedor.className = 'genre-container-category';

            const titulo = document.createElement('h2');
            titulo.textContent = genre.name;
            divContenedor.appendChild(titulo);
            ObtenerGenero(api, genre.id, divContenedor);
            contenedor_pelicula.appendChild(divContenedor);
        });
    })
    .catch(error => console.error('Error:', error));
}


function ObtenerGenero(llaveApi, generoId, contenido) {
    const UrlApiPelicula = `https://api.themoviedb.org/3/discover/movie?api_key=${llaveApi}&with_genres=${generoId}`;
    fetch(UrlApiPelicula)
        .then(respuesta => respuesta.json())
        .then(datos => {
            datos.results.forEach(pelicula => {
                const contenedor_pelicula = document.createElement('div');
                contenedor_pelicula.className = 'tarjeta-category';

                const info_pelicula = `
                    <div class="tarjetas-img-category">
                        <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" alt="${pelicula.title}">
                        <h3>${pelicula.title}</h3>
                        <p>${pelicula.overview}</p>
                    </div>
                `;

                contenedor_pelicula.innerHTML = info_pelicula;
                contenido.appendChild(contenedor_pelicula);
            });
        })
        .catch(error => console.error('Error:', error));
}


obtenerGenerosPeliculas();


//busar
const btnBuscar = document.getElementById('search'); 
btnBuscar.addEventListener('click', function () {
    const busquedaTermino = document.getElementById('busqueda').value;
    if (busquedaTermino.trim() !== '') {
        buscarCategoria(busquedaTermino);
    }
});
function buscarCategoria(ingresoCategoria) {
    const contenedor_pelicula = document.getElementById('container');
    contenedor_pelicula.innerHTML = ''; 
    const idCategoria = parseInt(ingresoCategoria);
    if (!isNaN(idCategoria)) {
        ObtenerGenero(api, idCategoria, contenedor_pelicula);
        return;
    }
    fetch(`${urlApiPagina}`)
        .then(respuesta => respuesta.json())
        .then(dato => {
            const category = dato.genres.find(genre => genre.name.toLowerCase() === ingresoCategoria.toLowerCase());
            if (category) {
                ObtenerGenero(api, category.id, contenedor_pelicula);
            } else {
                const mensajeError = document.createElement('div');
                mensajeError.className = 'error-message';
                const TituloError = document.createElement('h2');
                TituloError.textContent = genre.name;
                genreDiv.appendChild(TituloError);
                mensajeError.textContent = 'Categoría no encontrada';
                contenedor_pelicula.appendChild(mensajeError);
            }
        })
        .catch(error => console.error('Error:', error));
}
