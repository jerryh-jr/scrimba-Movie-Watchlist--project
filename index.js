const elements = {
    moveList: document.getElementById("movie-list"),
    url: 'http://www.omdbapi.com/?apikey=[yourkey]&',
    urlPoster: 'http://img.omdbapi.com/?apikey=[yourkey]&'
}

const res = await fetch(url);
const movieData = await res.json();
console.log(movieData);