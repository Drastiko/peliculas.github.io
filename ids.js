const llaveApi = '69d71375ddd39d3c7f811208fef47132';
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${llaveApi}`;
function idCategoriasGeneros() {
    const contenedor = document.getElementById('container');
    const apiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${llaveApi}`;
    fetch(apiUrl)
        .then(respuesta => respuesta.json())
        .then(dato => {
            const ul_contenedor = document.createElement('ul');
            ul_contenedor.className = 'id-list';

            dato.genres.forEach(generos => {
                const li = document.createElement('li');
                li.textContent = `ID# ${generos.id} - Género de pelicula: ${generos.name} `;
                ul_contenedor.appendChild(li);
            });
            contenedor.appendChild(ul_contenedor);
        })
        .catch(error => console.error('Error:', error));
}
idCategoriasGeneros();


