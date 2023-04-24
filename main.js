import { API } from "./js/API.js";
import { LocalStorage } from "./js/LocalStorage.js";

//SELECIONAR A DIV FILME, PARA POR O FILHO ELEMENTO FILME
const filmesContainer  = document.querySelector('.filmes');
const form = document.querySelector('form');

//SELECIONAR INPUT DO CAMPO DE PESQUISA
const input = document.querySelector('input');

//SELECIONAR O BOTAO DE PESQUISA
const botaoPesquisa = document.querySelector(".lupa-pesquisa");
botaoPesquisa.addEventListener("click", buscarFilme);

//SELECIONAR O CHECKBOX
const checkboxInput = document.querySelector('input[type="checkbox"]')

//MOSTRAR SÓ OS FAVORITOS QUANDO CHECKBOX FOR CLICADO
checkboxInput.addEventListener('change', checkCheckboxStatus)
botaoPesquisa.addEventListener('click', buscarFilme)

form.addEventListener('submit', function(event) {
    event.preventDefault();
    buscarFilme()
})

//FUNCAO DO CHECKBOX
function checkCheckboxStatus() {
    const estaChecado = checkboxInput.checked
    limparFilmes();
    if(estaChecado) {
        const filmes  = LocalStorage.buscarFilmesFavoritos() || [];
        filmes.forEach(filme => renderMovies(filme))
    } else {
       return todosFilmesAPI()
    }
}

//PARA BUSCAR FILME
async function buscarFilme() { 
    const inputValue = input.value;
    limparFilmes()
    if(inputValue != '') {
        const filmes = await API.buscarFilmePorNome(inputValue);
        filmes.forEach(filme => renderMovies(filme))
    } else {
        return todosFilmesAPI()
    }
}

//PARA TIRAR TODOS OS FILMES DA TELA
function limparFilmes() {
    filmesContainer.innerHTML = ''
}

//IMPLEMENTAR FUNÇÃO DE FAVORITAR
function favoritarBotaoPressionado(event, filme) {
    const favoritoStatus = {
        favoritado: 'assets/icons/Heart-fill.svg',
        naoFavoritado: 'assets/icons/Heart.svg'
    }

    if(event.target.src.includes(favoritoStatus.naoFavoritado)) {
        event.target.src = favoritoStatus.favoritado
        LocalStorage.salvarLocalStorage(filme)
    } else {
        event.target.src = favoritoStatus.naoFavoritado
        LocalStorage.removerLocalStorage(filme.id)
    }
}

//PARA APARECER NA TELA
async function todosFilmesAPI () {
    const filmes = await API.filmesAPI();
    filmes.forEach(filme => renderMovies(filme))
};

window.onload = function () {
    todosFilmesAPI();
}

//FUNCTION PARA RENDERIZAR O FILME
function renderMovies(filme) {
    const { id, title, poster_path, vote_average, release_date, overview } = filme;
    
    const ehFavorito = LocalStorage.checarFilmeFavorito(id);
    const year = new Date(release_date).getFullYear();
    const image = `https://image.tmdb.org/t/p/w500${poster_path}`;

    //PARA CRIAR OS ELEMENTOS NA PÁGINA
    const elementoFilme = document.createElement('div');
    elementoFilme.classList.add('filme');
    filmesContainer.appendChild(elementoFilme);

    //CRIANDO A DIV FILME__INFORMACOES
    const filmeInformacoes = document.createElement('div');
    filmeInformacoes.classList.add('filme__informacoes');

    //CRIANDO A DIV FILME__IMAGEM
    const filmeImagemContainer = document.createElement('div');
    filmeImagemContainer.classList.add('filme__imagem');
    const filmeImagem = document.createElement('img');
    filmeImagem.src = image;
    filmeImagem.alt = `${title} Poster`;
    filmeImagemContainer.appendChild(filmeImagem);
    filmeInformacoes.appendChild(filmeImagemContainer);

    //CRIANDO A DIV FILME__TEXTO
    const filmeTextoContainer = document.createElement('div');
    filmeTextoContainer.classList.add('filme__texto');
    const filmeTitulo = document.createElement('h3');
    filmeTitulo.textContent = `${title} (${year})`;
    filmeTextoContainer.appendChild(filmeTitulo);
    filmeInformacoes.appendChild(filmeTextoContainer);

    //CRIANDO A DIV FILME__INFORMACOES
    const informacoes = document.createElement('div');
    informacoes.classList.add('filme__informacoes');
    filmeTextoContainer.appendChild(informacoes);

    //CRIANDO A DIV CLASSIFICACAO
    const classificacaoContainer = document.createElement('div');
    classificacaoContainer.classList.add('classificacao');
    const classificacaoImagem = document.createElement('img');
    classificacaoImagem.src = 'assets/icons/Star.svg';
    classificacaoImagem.alt = 'Classificacao';
    const filmeClassificacao = document.createElement('span');
    filmeClassificacao.classList.add('filme__classificacao');
    filmeClassificacao.textContent = vote_average;
    classificacaoContainer.appendChild(classificacaoImagem);
    classificacaoContainer.appendChild(filmeClassificacao);
    informacoes.appendChild(classificacaoContainer);

    //CRIANDO A DIV FAVORITO
    const favoritar = document.createElement('div');
    favoritar.classList.add('favoritar');
    const favoritarImagem = document.createElement('img');
    favoritarImagem.src = ehFavorito ? 'assets/icons/Heart-fill.svg' : 'assets/icons/Heart.svg'
    favoritarImagem.alt = 'Favorito';
    favoritarImagem.classList.add('favoritar__imagem');
    favoritarImagem.addEventListener('click', (event) => favoritarBotaoPressionado(event, filme))
    const favoritarTexto = document.createElement('span');
    favoritarTexto.classList.add('filme__favoritar');
    favoritarTexto.textContent = 'Favoritar';
    favoritar.appendChild(favoritarImagem);
    favoritar.appendChild(favoritarTexto);
    informacoes.appendChild(favoritar);
    

    //CRIANDO A DIV FILME DESCRICAO
    const filmeDescricaoContainer = document.createElement('div');
    filmeDescricaoContainer.classList.add('filme__descricao');
    const filmeDescricao = document.createElement('span');
    filmeDescricao.textContent = overview;
    filmeDescricaoContainer.appendChild(filmeDescricao);

    elementoFilme.appendChild(filmeInformacoes);
    elementoFilme.appendChild(filmeDescricaoContainer);
};



