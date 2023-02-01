const elements = {
    moveList: document.getElementById("movie-list"),
    searchBtnEl: document.getElementById("search__btn--el"),
    previousBtnEl: document.getElementById("previous__btn--el"),
    nextBtnEl: document.getElementById("next__btn--el"),
    movieInputEl: document.getElementById("movie-input-el"),
    movieFormEl: document.getElementById("movie-form"),
    movieListEl: document.getElementById("movie-list"),
    url: 'https://www.omdbapi.com/?apikey=45a430b9&',
    movieArray: [],
    moviesPlotEl: document.getElementsByClassName("movies__plot"),
}

let pageNum = 1;
let totalMovies = 0;

function nextPage(){
    if((pageNum * 10) < (totalMovies + 10)) {
        pageNum++;
        movieFetch(event);
    } else {
        elements.nextBtnEl.disabled;
    }
}

function prevPage(){
    if(pageNum > 1) {
        pageNum--;
        movieFetch(event);
    } else {
        elements.previousBtnEl.disabled;
    }
}

function showText() {
    const { moviesPlotEl } = elements;
    if(moviesPlotEl.style.overflow === "hidden") {
        moviesPlotEl.style.overflow === "visible"
    } else {
      moviesPlotEl.style.overflow === "hidden";
    }
}

async function movieFetch(e) {
    e.preventDefault();
    elements.movieListEl.innerHTML = '';
    const { url, movieInputEl } = elements;
    const res = await fetch(`${url}s=${movieInputEl.value}&page=${pageNum}`);
    const movieData = await res.json();
    totalMovies = movieData.totalResults;
    console.log(totalMovies);
    const dataCalls = movieData.Search.map(async ({ imdbID }) => {
        const response = await fetch(`${url}i=${imdbID}`);
        const data = await response.json();
        return data;
    });
    const movieDataAll = await Promise.all(dataCalls);
    listMovie(movieDataAll);
}

function listMovie(movieData) {
        for(let i = 0; i < movieData.length; i++){
            elements.movieListEl.innerHTML += `
            <div class="movies__inner--container">
                <div class="movies__container--header">
                    <img src="${movieData[i].Poster}" alt="${movieData[i].Title}" class="movies__inner--image">
                </div>
                <div class="movies__container--info">
                     <h3>${movieData[i].Title}</h3>
                     <aside><image src="icons/star.png"></image>  ${movieData[i].imdbRating}</aside>
                     <div class="movies__container--list">
                        <p>${movieData[i].Runtime}</p>
                        <p>${movieData[i].Genre}</p>
                        <button class="movies__button"><image src="./icons/plus-icon.png"></image>  Watchlist</button>
                    </div>
                    <p class="movies__plot">${movieData[i].Plot}</p>
                </div>
            </div>
            `
        }
}

window.addEventListener('load', () => {
    elements.movieFormEl.addEventListener("submit", movieFetch);
});

elements.nextBtnEl.addEventListener('click', nextPage);
elements.previousBtnEl.addEventListener('click', prevPage);
elements.moviesPlotEl.addEventListener('click', showText);
