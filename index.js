//fetch data
const fetchData = async (strSearch) => {
    const response = await axios.get('http://www.omdbapi.com', {
        params: {
            apikey: '2770e2df',
            s: strSearch
        }
    });
    console.log(response.data);
}

//listen for input
const input = document.querySelector('input');
const onInput = event =>{
    fetchData(event.target.value);
}
//debounce function from loaddash
input.addEventListener('input', 
    _.debounce(onInput, 1000)
)
