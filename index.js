const elements = {
    moveList: document.getElementById("movie-list"),
    searchBtnEl: document.getElementById("search__btn--el"),
    movieInputEl: document.getElementById("movie-input-el"),
    movieFormEl: document.getElementById("movie-form"),
    movieListEl: document.getElementById("movie-list"),
    url: 'http://www.omdbapi.com/?apikey=45a430b9&',
    urlPoster: 'http://img.omdbapi.com/?apikey=45a430b9&'
}

async function movieFetch(e) {
    e.preventDefault();
    const { url, urlPoster, movieInputEl } = elements;
    const res = await fetch(`${url}t=${movieInputEl.value}`);
    const movieData = await res.json();
    console.log(movieData);
    listMovie(movieData);
    debugger;
}

function listMovie(movieData) {
    elements.movieListEl.innerHTML = `
    <h3>${movieData.Title}</h3>
    <p>${movieData.Actors}</p>
    <p>${movieData.Metascore}</p>
    <p>${movieData.Rated}</p>
    `

    console.log(movieData.Title)
    console.log(movieData.Actors)
    console.log(movieData.Metascore)
    console.log(movieData.Rated)
};

window.addEventListener('load', () => {
    elements.movieFormEl.addEventListener("submit", movieFetch);
});