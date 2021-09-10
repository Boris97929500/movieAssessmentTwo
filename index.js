//fetch data
const fetchData = async (strSearch) => {
    const response = await axios.get('http://www.omdbapi.com', {
        params: {
            apikey: '2770e2df',
            s: strSearch
        }
    });
    return response.data.Search;
}

//listen for input
const input = document.querySelector('input');
const onInput = async event =>{
    const movies = await fetchData(event.target.value);
    console.log(movies);

    for ( let movie of movies ){
        const div = document.createElement('div');

        div.innerHTML = `
        <img src="${movie.Poster}" />
        <h2>${movie.Title}</h2>
        `;

        document.querySelector('#target').appendChild(div);
    }



}
//debounce function from loaddash
input.addEventListener('input', 
    _.debounce(onInput, 1000)
)
