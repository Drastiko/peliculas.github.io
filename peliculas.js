const llaveApi = '69d71375ddd39d3c7f811208fef47132';
const urlApiPagina = 'https://api.themoviedb.org/3';
function obtenerPeliculaPopular() {
    fetch(`${urlApiPagina}/movie/popular?api_key=${llaveApi}`)
        .then(respuesta => respuesta.json())
        .then(dato => {
            const peliculasContainer = document.getElementById('container');

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
obtenerPeliculaPopular();

const btnBuscar = document.getElementById('search'); 
btnBuscar.addEventListener('click', function () {
    const terminoBuscado = document.getElementById('busqueda').value;
    if (terminoBuscado.trim() !== '') {
        peliculaBuscada(terminoBuscado);
    }
});
function peliculaBuscada(query) {
    const peliculasContainer = document.getElementById('container');
    peliculasContainer.innerHTML = '';
    fetch(`${urlApiPagina}/search/movie?api_key=${llaveApi}&query=${query}`)
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