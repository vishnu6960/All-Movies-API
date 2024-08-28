document.addEventListener('DOMContentLoaded', ()=>{

    const url = 'https://api.themoviedb.org/3/trending/all/day?language=en-US';
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmY1YzIwNjZjYjM4NTFkMTBlZTA2MWY5M2ZiNDA1ZiIsIm5iZiI6MTcyNDMxOTIyMS4zODMwMTgsInN1YiI6IjYzYTY4OTQ0ZDU1YzNkMDBhN2Y1OGM4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UH7_9jMTH7jakeLx4_PXkszjAihjvgY4uWeXn_iHelM'
    }
    };

    fetch(url, options)
    .then(res => res.json())
    .then(json => {
        // console.log(json.results)
        display(json.results, "trending")
    })
    .catch(err => console.error('error:' + err));
})

const mainContainer = document.getElementById('mainContainer')
const mainContainerTitle = document.getElementById('mainContainerTitle')
const baseUrl = 'https://image.tmdb.org/t/p/'
const size = 'w500'
async function display(data, endpoint){
    mainContainerTitle.innerHTML = ""
    mainContainer.innerHTML = ""
    mainContainerTitle.innerHTML = `<h2>${endpoint.toUpperCase()}</h2>`
    data.forEach((item)=>{
        genreFun(item).then(genre =>{
            // console.log(genre)
            let movieCard = {
                id: item.id,
                title: item.title || item.name,
                poster_path: item.poster_path,
                genre: genre,
                release_date: item.release_date,
                vote_average: item.vote_average
            }
            let card = document.createElement('div')
            card.className = 'card'
            card.innerHTML = `
                <div class="imageDiv">
                    <img src=${baseUrl}${size}${item.poster_path} class="card-img-top2" alt="...">
                </div>
                <div class="card-body">
                    <div class='titleDiv'>
                        <h5 class="card-title">${item.title || item.name}</h5>
                    </div>
                    <p>${genre}</p>
                    <p><strong>Released on : </strong>${item.release_date}</p>
                    <p class = "rating"><strong>Rating : </strong>${item.vote_average.toFixed(1)}/10(${item.vote_count})</p>
                    <div class="d-flex justify-content-between">
                        <a href=https://www.themoviedb.org/movie/${item.id} class="btn btn-primary">Know More</a>
                        <button class = "addFavButton btn-outline-success">❤️</button>
                    </div>
                </div>
            `
            if(item.vote_average == 0 || item.vote_average == null){
                card.querySelector(".rating").style.display = "none"
            }
            if(item.poster_path != null){
                mainContainer.appendChild(card)
            }
            // console.log(movieCard)
            card.querySelector(".addFavButton").addEventListener("click", () => addFavouritesFun(movieCard))
        })  
    })
}

//popular movies function calling
document.getElementById("popularButton").addEventListener("click", () => moviesMore("popular"))

//upcoming movies function calling
document.getElementById("nowPlayingButton").addEventListener("click", () => moviesMore("now_playing"))

//now-playing movies function calling
document.getElementById("upcomingButton").addEventListener("click", () => moviesMore("upcoming"))

//upcoming movies function calling
document.getElementById("topRatedButton").addEventListener("click", () => moviesMore("top_rated"))


//popular, nowplaying, upcoming function
function moviesMore(endpoint){
    // console.log(mainContainer)
    console.log(endpoint)
    const url = `https://api.themoviedb.org/3/movie/${endpoint}?language=en-US&page=1`;
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmY1YzIwNjZjYjM4NTFkMTBlZTA2MWY5M2ZiNDA1ZiIsIm5iZiI6MTcyNDY2OTIyNy45MDc3MDEsInN1YiI6IjYzYTY4OTQ0ZDU1YzNkMDBhN2Y1OGM4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.--sN-KdBvJ_KSAocc6aRip3kPiy0lCKFKePz06C13Cs'
    }
    };

    fetch(url, options)
    .then(res => res.json())
    .then(json => {
        // console.log(json)
        display(json.results, endpoint)
    })
    .catch(err => console.error('error:' + err));
}


//searching movies
document.getElementById("searchForm").addEventListener("submit", (e)=>{
    e.preventDefault()
    let movieName = document.getElementById("inputMovie").value
    // console.log(typeof movie)

    const url = `https://api.themoviedb.org/3/search/multi?query=${movieName}&include_adult=false&language=en-US&page=1`;
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmY1YzIwNjZjYjM4NTFkMTBlZTA2MWY5M2ZiNDA1ZiIsIm5iZiI6MTcyNDc0NDg5Mi44NjA5ODcsInN1YiI6IjYzYTY4OTQ0ZDU1YzNkMDBhN2Y1OGM4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H4vpRY7-n2A6ujYagKtvppV22V1J1yfNlM0DQ8gmKLw'
    }
    };

    fetch(url, options)
    .then(res => res.json())
    .then(json => {
        display(json.results, `${movieName} | Search results`)
        console.log(json)
    })
    .catch(err => console.error('error:' + err));
})


//finding genre
async function genreFun(data){
    let genreArr = data.genre_ids
    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmY1YzIwNjZjYjM4NTFkMTBlZTA2MWY5M2ZiNDA1ZiIsIm5iZiI6MTcyNDc0NDg5Mi44NjA5ODcsInN1YiI6IjYzYTY4OTQ0ZDU1YzNkMDBhN2Y1OGM4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H4vpRY7-n2A6ujYagKtvppV22V1J1yfNlM0DQ8gmKLw'
    }
    };
    const res = await fetch(url, options);
    const json = await res.json();
    const genres = json.genres.filter(genre => genreArr.includes(genre.id)).map(genre => genre.name);

    // console.log(genres)
    return genres;
}

// localStorage.clear()
//adding cards to favourites
function addFavouritesFun(data){
    let favs = JSON.parse(localStorage.getItem('favourites')) || [];
    console.log(favs)
    // const exists = favs.some(fav => fav.id === cardData.id);
    console.log(exists)

    if(!exists){
        favs.push(data)
        localStorage.setItem('favourites',JSON.stringify(data))
        alert(`${data.title} has been added to your favourites`)
    }
    else{
        alert(`${data.title} is already in your favourites`)
        
    }
}