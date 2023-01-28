const elements = {
    moveList: document.getElementById("movie-list"),
    searchBtnEl: document.getElementById("search__btn--el"),
    movieInputEl: document.getElementById("movie-input-el"),
    movieFormEl: document.getElementById("movie-form"),
    movieListEl: document.getElementById("movie-list"),
    url: 'http://www.omdbapi.com/?apikey=45a430b9&',
    movieArray: [],
}

async function movieFetch(e) {
    e.preventDefault();
    const { url, movieInputEl } = elements;
    const res = await fetch(`${url}s=${movieInputEl.value}`);
    const movieData = await res.json();
    const dataCalls = movieData.Search.map(async ({ imdbID }) => {
        const response = await fetch(`${url}i=${imdbID}`);
        const data = await response.json();
        return data;
    });
    const movieDataAll = await Promise.all(dataCalls);
    console.log(movieDataAll)
    listMovie(movieDataAll);
    debugger;
}

function listMovie(movieData) {
        for(let i = 0; i < movieData.length; i++){
            elements.movieListEl.innerHTML += `
            <div class="movies__inner--container">
                <div class="movies__container--header">
                    <img src="${movieData[i].Poster}" alt="${movieData[i].Title}" width="125" height="175">
                </div>
                <div class="movies__container--info">
                     <h3>${movieData[i].Title}</h3>
                     <aside>*${movieData[i].imdbRating}</aside>
                     <div class="movies__container--list">
                        <p>${movieData[i].Runtime}</p>
                        <p>${movieData[i].Genre}</p>
                        <button class="movies__button">+ Watchlist</button>
                    </div>
                    <p>${movieData[i].Plot}</p>
                </div>
            </div>
            `
        }
};

window.addEventListener('load', () => {
    elements.movieFormEl.addEventListener("submit", movieFetch);
});