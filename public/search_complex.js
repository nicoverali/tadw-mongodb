(function(){

const button = document.getElementById('button-complex')

button.addEventListener('click', function(e) {
    fetch('/complex')

    .then(function(response) {
        if(response.ok) {
            return response.json();
        }
        throw new Error('Hubo un problema con la consulta compleja.');
    })

    .then((data) => {
        let movies = ""
        data.forEach((movie) => {
            movies += makeMovieItem(movie)
        })
        replaceResults(movies)
    } )

    .catch(function(error) {
        replaceResults(makeErrorSign(error.message))
    });
})

})()