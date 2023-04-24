//PARA QUANDO FOR CONSUMIR A API
async function filmesAPI() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=pt-BR&page=1`;
    const urlConvertida = await fetch (url);
    const {results} = await urlConvertida.json();
    //RESULTS é como aparece no json o OBJETO que será usado
    return results;
}

//BUSCAR FILME POR NOME COMO PARAMETRO TITULO
async function buscarFilmePorNome(title) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${title}&language=pt-BR&page=1`;
    const urlConvertida = await fetch (url);
    //OBJETO RESULTS É O QUE QUERO USAR
    const { results } = await urlConvertida.json();

    return results;
}

export const API = {
    filmesAPI,
    buscarFilmePorNome
}
