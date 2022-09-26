(function(){


const button = document.getElementById('button-query');
const query = document.getElementById('query')

button.addEventListener('click', function(e) {
    fetch('/peliculas?' + new URLSearchParams({
      search: query.value,
    }) , {method: 'GET'})

    .then(function(response) {
      if(response.ok) {
        return response.json();
      }
      throw new Error('No pudimos procesar la solicitud, por favor volvelo a intentar.');
    })

    .then((data) => {
        if (data.length == 0) {
            replaceResults(makeErrorSign("No se obtuvo ningun resultado compatible."))
            return
        }

        let movies = "";
        data.forEach((movie)=> {
            movies += makeMovieItem(movie)
        })
        replaceResults(movies)
    } )
    .catch(function(error) {
      replaceResults(makeErrorSign(error.message))
    });

   

});

})()