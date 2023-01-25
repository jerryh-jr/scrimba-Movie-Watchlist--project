const elements = {
    moveList: document.getElementById("movie-list"),
    searchBtnEl: document.getElementById("search__btn--el"),
    movieInputEl: document.getElementById("movie-input-el"),
    url: 'http://www.omdbapi.com/?apikey=[apiKey]&',
    urlPoster: 'http://img.omdbapi.com/?apikey=[apiKey]&'
}

async function movieFetch() {
    const { url, urlPoster, movieInputEl } = elements;
    const res = await fetch(`${url}t=${moveInputEl.value}`);
    const movieData = await res.json();
    console.log(movieData);
};


elements.searchBtnEl.addEventListener("click", movieFetch)