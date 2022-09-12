
const button = document.getElementById('buttonBuscar');

button.addEventListener('click', function(e) {
  
   

    fetch('/items', {method: 'GET'})
    .then(function(response) {
      if(response.ok) {
        return response.json();
      }
      throw new Error('Request failed.');
    })
    .then((data) => {
        let lista = "";
        data.forEach((peli)=>
        {
            lista = lista + "<p>" + peli.title + "(" + peli.year + ")" +  "</p>";
        })
        const divRes = document.getElementById("resultados");
        divRes.innerHTML = lista;
        return;
    } )
    .catch(function(error) {
      console.log(error);
    });

   

});