const searchForm = document.querySelector('#searchForm');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');

const getMovieInfo = async (movie) => {
    const myAPIKey = "dbf8747f";
    const url = `http://www.omdbapi.com/?apikey=${myAPIKey}&t=${movie}`;
    const response = await fetch(url);
    const data = await response.json();
    showMovieData(data);
}

const showMovieData = (data) => {
    if (data.Response === "False") {
        movieContainer.innerHTML = `<h2>Movie not found</h2>`;
        return;
    }

    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-element');
    movieElement.innerHTML = `
        <h2>${Title}</h2>
        <p><strong>Rating:</strong> &#11088; ${imdbRating}</p>
        <p><strong>Genre:</strong> ${Genre}</p>
        <p><strong>Released:</strong> ${Released}</p>
        <p><strong>Runtime:</strong> ${Runtime}</p>
        <p><strong>Actors:</strong> ${Actors}</p>
        <p><strong>Plot:</strong> ${Plot}</p>
        <img src="${Poster}" alt="${Title} Poster"/>
    `;

    movieContainer.innerHTML = '';
    movieContainer.appendChild(movieElement);
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if (movieName !== '') {
        getMovieInfo(movieName);
    }
});
