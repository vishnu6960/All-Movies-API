// document.addEventListener('DOMContentLoaded', ()=>{

//     const url = 'https://api.themoviedb.org/3/trending/all/day?language=en-US';
//     const options = {
//     method: 'GET',
//     headers: {
//         accept: 'application/json',
//         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmY1YzIwNjZjYjM4NTFkMTBlZTA2MWY5M2ZiNDA1ZiIsIm5iZiI6MTcyNDMxOTIyMS4zODMwMTgsInN1YiI6IjYzYTY4OTQ0ZDU1YzNkMDBhN2Y1OGM4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UH7_9jMTH7jakeLx4_PXkszjAihjvgY4uWeXn_iHelM'
//     }
//     };

//     fetch(url, options)
//     .then(res => res.json())
//     .then(json => console.log(json.results))
//     .catch(err => console.error('error:' + err));
// })

const mainContainer = document.getElementById('mainContainer')
const baseUrl = 'https://image.tmdb.org/t/p/'
const size = 'w500'
display()
function display(){
    let card = document.createElement('div')
    card.className = "cardDiv"
    card.innerHTML = `
    <img src=''>
    <div class="titleDiv">
        <strong>baahubali</strong>
        <div>
            <p></p>
            
        </div>
    </div>
    `
    mainContainer.appendChild(card)
}