const claveApi = '69d71375ddd39d3c7f811208fef47132';

function obtenerPeliculaReciente() {
    const urlApiPelicula = `https://api.themoviedb.org/3/discover/movie?api_key=${claveApi}&sort_by=release_date.desc&include_adult=false`;
    fetch(urlApiPelicula)
        .then(respuesta => respuesta.json())
        .then(dato => {
            const contenedor_pelicula = document.getElementById('container');
            contenedor_pelicula.innerHTML = '';

            dato.results.forEach(pelicula => {
                const divPelicula = document.createElement('div');
                divPelicula.className = 'tarjeta';

                const infoPelicula = `
                    <div class="tarjetas-img">
                        <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" alt="${pelicula.title}">
                        <h3>${pelicula.title}</h3>
                        <p>${pelicula.overview}</p>
                    </div>
                `;

                divPelicula.innerHTML = infoPelicula;
                contenedor_pelicula.appendChild(divPelicula);
            });
        })
        .catch(error => console.error('Error:', error));
}

function buscarPelicula(query) {
    const urlPaginaPelicula = `https://api.themoviedb.org/3/search/movie?api_key=${claveApi}&query=${query}`;
    const peliculasContainer = document.getElementById('container');
    peliculasContainer.innerHTML = '';

    fetch(urlPaginaPelicula)
        .then(respuesta => respuesta.json())
        .then(dato => {
            dato.results.forEach(pelicula => {
                const tarjetaDiv = document.createElement('div');
                tarjetaDiv.className = 'tarjeta';

                const contenidoTarjeta = `
                    <div class="tarjetas-img">
                        <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" alt="${pelicula.title}">
                        <h2>${pelicula.title}</h2>
                        <p>${pelicula.overview}</p>
                    </div>
                `;

                tarjetaDiv.innerHTML = contenidoTarjeta;
                peliculasContainer.appendChild(tarjetaDiv);
            });
        })
        .catch(error => console.error('Error:', error));
}

obtenerPeliculaReciente();

const btnBuscar = document.getElementById('search');
btnBuscar.addEventListener('click', function () {
    const terminoBuscado = document.getElementById('busqueda').value;
    if (terminoBuscado.trim() !== '') {
        buscarPelicula(terminoBuscado);
    }
});