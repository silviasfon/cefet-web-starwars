// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.dev/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução

import { play } from './music-sem-private.js'
import { toRomanNumber } from './roman.js'
import { restartAnimation } from './restart-animation.js'

const API_ENDPOINT = 'https://swapi.dev/api'

play(
  {
    audioUrl: 'audio/tema-sw.mp3', 
    coverImageUrl: 'imgs/logo.svg', 
    title: 'Intro', 
    artist: 'John Williams'
  },
  document.body
)

fetch(`${API_ENDPOINT}/films`)
  .then(response => response.json())
  .then(json => {
    console.log(json)
    let movieListEl = document.querySelector('#filmes ul');
    let movies = json.results.sort(function(a, b){
      return a.episode_id < b.episode_id ? -1 : 1;
    })
    movies.forEach(movie => {
      insertMovie(movie, movieListEl)
    })
  })

function compareMovies(a, b){
  return a.episode_id < b.episode_id ? -1 : 1;
}

function insertMovie({title, episode_id, opening_crawl}, parentEl) {
  let liEl = document.createElement('li')
  liEl.innerHTML = `Episode ${toRomanNumber(episode_id)} - ${title}`
  liEl.addEventListener('click', event => changeIntroduction(title, episode_id, opening_crawl))
  parentEl.appendChild(liEl)
}

function changeIntroduction(title, episode_id, opening_crawl) {
  console.log(title)
  const introEl = document.querySelector('pre.introducao');
  introEl.innerHTML = `Episode ${toRomanNumber(episode_id)}
  ${title}
  
  ${opening_crawl}`
  restartAnimation(introEl)
}