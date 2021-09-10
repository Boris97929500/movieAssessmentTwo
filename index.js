//fetch data
const fetchData = async (strSearch) => {
    const response = await axios.get('http://www.omdbapi.com', {
        params: {
            apikey: '2770e2df',
            s: strSearch
        }
    });

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

