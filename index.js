const elements = {
    moveList: document.getElementById("movie-list"),
    searchBtnEl: document.getElementById("search__btn--el"),
    movieInputEl: document.getElementById("movie-input-el"),
    movieFormEl: document.getElementById("movie-form"),
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
    console.log(movieData.Title)
    console.log(movieData.Actors)
    console.log(movieData.Metascore)
    console.log(movieData.Rated)
};

window.addEventListener('load', () => {
    elements.movieFormEl.addEventListener("submit", movieFetch);
});