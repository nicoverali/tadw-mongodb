(function(){

const button = document.getElementById('button-merge')

button.addEventListener('click', function(e) {

    fetch('/merge')
  
    .then(function(response) {
    if(response.ok) {
        return response.json();
    }
    throw new Error('Hubo un problema al intentar mixear las peliculas.');
    })

    .then((data) => {
        let merge = makeMovieItem(data.merge);

        let moviesHeadline = `
            <h2 class="merge-movies-headline">
                Creada a partir de ...
            </h2>
        `

        let movies = ""
        data.movies.forEach((movie) => {
            movies += makeMovieItem(movie)
        })

        replaceResults(merge + moviesHeadline + movies)
    } )
    .catch(function(error) {
    replaceResults(makeErrorSign(error.message))
    });

})

})()