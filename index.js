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
    console.log(movieData);
    listMovie(movieData);
    // debugger;
    const dataCalls = movieData.Search.map(async ({ imdbID }) => {
        const response = await fetch(`${url}i=${imdbID}`);
        const data = await response.json();
        return data;
    });
    const movieDataAll = await Promise.all(dataCalls);
    debugger;
}

async function getMovieData(movie){
    const { url, movieArray } = elements;
    for(let i = 0; i < movieData.Search.length; i++){
        const res = await fetch(`${url}t=${movie.Search[i]}`);
        const movies = await res.json();
        movieArray.push("movies");
    }
};

console.log(elements.movieArray)
function listMovie(movieData) {
    if(movieData.Error) {
        return elements.movieListEl.innerHTML = `<h2>Movie Not Found</h2>`;
    } else {
        for(let i = 0; i < movieData.Search.length; i++){
            elements.movieListEl.innerHTML += `
            <img src="${movieData.Search[i].Poster}" alt="${movieData.Search[i].Title}" width="125" height="175">
            <h3>${movieData.Search[i].Title}</h3>
            <p>Actors: ${movieData.Search[i].Actors}</p>
            <p>Meta Score: ${movieData.Search[i].Metascore}</p>
            <p>Movie Rating: ${movieData.Search[i].Rated}</p>
            `

            // console.log(movieData.Title)
            // console.log(movieData.Actors)
            // console.log(movieData.Metascore)
            // console.log(movieData.Rated)}
        }
     }    
};

window.addEventListener('load', () => {
    elements.movieFormEl.addEventListener("submit", movieFetch);
});