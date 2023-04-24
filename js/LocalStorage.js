const localStorageKey = 'filmesFavoritos';

//PARA BUSCAR O FILME FAVORITO NO LOCAL STORAGE
function buscarFilmesFavoritos() {
    return JSON.parse(localStorage.getItem(localStorageKey));
}

//PARA SALVAR O FILME FAVORITO NO LOCAL STORAGE
function salvarLocalStorage(filme) {
    const filmes = buscarFilmesFavoritos() || [];
    filmes.push(filme);
    const filmesJSON = JSON.stringify(filmes);
    localStorage.setItem(localStorageKey, filmesJSON)
}

//PARA CHECAR FILME FAVORITO PELO ID
function checarFilmeFavorito(id) {
    const filmes = buscarFilmesFavoritos() || [];
    return filmes.find(filme => filme.id == id)
}

//PARA REMOVER FILME FAVORITO
function removerLocalStorage(id) {
    const filmes = buscarFilmesFavoritos() || [];
    const procurarFilme = filmes.find(filme => filme.id == id);
    const novoFilme = filmes.filter(filme => filme.id != procurarFilme.id)
    localStorage.setItem(localStorageKey, JSON.stringify(novoFilme))
}

export const LocalStorage = {
    buscarFilmesFavoritos,
    salvarLocalStorage,
    checarFilmeFavorito,
    removerLocalStorage
}