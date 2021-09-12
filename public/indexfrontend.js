let movieTitle = "";
let movieData = "";

//fetch data
const fetchData = async (strSearch) => {
    const response = await axios.get('http://www.omdbapi.com', {
        params: {
            apikey: '2770e2df',
            s: strSearch
        }
    });
    //data validation
    if(response.data.Error){
        return [];
    }


    return response.data.Search;
};

const root = document.querySelector('.autofinish');

root.innerHTML =  `
    <label><b>Search For a Movie</b></label>
    <input class="input" />
    <div class="dropdown">
    <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
    </div>
    </div>
    
`;

//listen for input
const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

const onInput = async event =>{


    const movies = await fetchData(event.target.value);
    
    if( movies == ''){
        dropdown.classList.remove('is-active');  
        return;      
    }

    resultsWrapper.innerHTML='';
    dropdown.classList.add('is-active');
    for ( let movie of movies ){
        const option = document.createElement('a');
        const imgSrc = movie.Poster === 'N/A' ? '': movie.Poster;

        option.classList.add('dropdown-item');
        option.innerHTML = `
        <img src="${imgSrc}" />
        ${movie.Title}
        `;

        option.addEventListener('click',()=>{
            dropdown.classList.remove('is-active');
            input.value=movie.Title;
            movieClicked(movie);
        })

        resultsWrapper.appendChild(option);
    }



}
//debounce function from loaddash
input.addEventListener('input', 
    _.debounce(onInput, 1000)
)

document.addEventListener('click', event =>{
    if(!root.contains(event.target)){
        dropdown.classList.remove('is-active');
    }
})

const movieClicked = async movie =>{
    const response = await axios.get('http://www.omdbapi.com', {
        params:{
            apikey: '2770e2df',
            i: movie.imdbID
        }
    })
    movieData = response.data
    // console.log(response.data)
    document.querySelector('#movieStats').innerHTML = showDetails(response.data);
}

const showDetails = (filmInfo) =>{
    return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${filmInfo.Poster}" alt="${filmInfo.Title} image"/>
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${filmInfo.Title}</h1>
          <h4>${filmInfo.Genre}</h4>
          <p>${filmInfo.Plot}</p>
        </div>
      </div>
    </article>


  `
}

document.getElementById('submitButton').addEventListener('click', async (event)=>{
    const data = movieData ;
    // basic error handling with alert
    if(data == ""){
        alert("please select a movie")
        return;
    } 
    const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/api',
        data: {
            data
        }
    })

})