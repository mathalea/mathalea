/* global $ fetch */
import { addElement, create } from './dom'
import { menuDesExercicesDisponibles } from './menuDesExercicesDisponibles'
import { getFilterFromUrl } from './getUrlVars.js'


export async function initDom (vue) {
  document.body.innerHTML = ''
  const domInitialise = new Event('domInitialise', { bubbles: true })
  document.dispatchEvent(domInitialise)
  console.log('ko')
  const nav = navMathAlea()
  const section = addElement(document.body, 'section', { class: 'ui container' })
  addElement(section, 'div', { id: 'containerErreur' })
  section.append(enteteChoixDesExercices())
  section.append(espaceVertical())
  const doubleColonne = addElement(section, 'div', { class: 'ui stackable two column grid', dir: 'ltr' })
  const colonneGauche = addElement(doubleColonne, 'div', { id: 'left', class: 'column', style: 'height:75vh;' })
  const colonneDroite = addElement(doubleColonne, 'div', { id: 'right', class: 'column', style: 'height:75vh; overflow-y: auto;' })
  const footer = footerMathAlea()
  await fetchHtmltoElement('templates/exercicesDisponibles.html', colonneGauche)
  await fetchHtmltoElement('templates/exercices.html', colonneDroite)
  await menuDesExercicesDisponibles()
  console.log('3')
  // gestion des filtres :
  //  au chargement de la page on vérifie s'il y a un filtre dans l'url si c'est le cas on selectionne le filtre dans la page html.
  //  gestion d'evenement sur le "select" filtre. Au changement on place la valeur dans l'url et on relance le calcul des exercices à afficher.
  if (document.getElementById('filtre')) {
    const filtre = getFilterFromUrl()
    if (filtre) {
      document.getElementById('filtre').value = filtre
    }
    document.getElementById('filtre').addEventListener('change', function () {
    // gestion du changement du select.
      const regex = /'([?;&])filtre[^&;]*[;&]?'/
      const query = window.location.search.replace(regex, '$1').replace(/&$/, '')
      const filtre = document.getElementById('filtre').value
      const url = (query.length > 2 ? query + '&' : '?') + (filtre !== 'tous' ? 'filtre=' + filtre : '')
      let modeTableauActif = false // Gestion pour le mode tableau particulière pour gérer l'activation de "datatable"
      window.history.pushState('', '', url)
      if ($('#mode_choix_liste').is(':visible')) {
        $('#mode_choix_liste').trigger('click')
        modeTableauActif = true
      }
      menuDesExercicesDisponibles() // Calcul de la liste des exercices à afficher.
      if (modeTableauActif) {
        $('#mode_choix_tableau').trigger('click')
      }
      $('.ui.dropdown').dropdown() // Pour le menu des exercices, mise à jour des "accordion"
      $('.ui.accordion').accordion('refresh')
      $('.ui.checkbox').checkbox()
    })
  }
  $('.ui.dropdown').dropdown() // Pour le menu des exercices
  $('.ui.accordion').accordion('refresh')
  $('.ui.checkbox').checkbox()
  // Gestion du bouton de copie
  $('.ui.button.toggle').state() // initialise le bouton
}

/**
 * Bandeau de navigation
 */
function navMathAlea () {
  const nav = create('nav')
  nav.innerHTML = `
  <div class="ui top attached five item stackable container menu  ">
  <div class="ui  dropdown item" class="blanc">CoopMaths <i class="dropdown icon"></i>
    <div class="menu">
      <a href="/" class="item">Accueil</a>
      <a href="/6e" class="item">Sixième</a>
      <a href="/5e" class="item">Cinquième</a>
      <a href="/4e" class="item">Quatrième</a>
      <a href="/3e" class="item">Troisième</a>
      <a href="/2e" class="item">Seconde</a>
      <a href="/twitter" class="item">Actualités</a>
    </div>
  </div>
  <a href="/a_propos/" class="ui simple  item">À propos</a>
  <a href="/telechargements" class="ui simple  item">Téléchargements</a>
  <a href="mailto:contact@coopmaths.fr" class="ui simple  item">Contact</a>
  <div class="ui  dropdown item">MathALEA <i class="dropdown icon"></i>
    <div class="menu">
      <a href="/mathalea.html" class="item">Exercices en ligne</a>
      <a href="/cm.html" class="item">Exercices chronométrés</a>
      <a href="/mathalealatex.html" class="item">Générateur LaTeX/PDF</a>
      <a href="/alacarte.html" class="item">Évaluation à la carte</a>
      <a href="/mathalea_amc.html" class="item">Générateur AMC</a>
      <a href="/mathalea.html?filtre=outils" class="item">Outils pour le professeur</a>
      <a href="/mathalea2d.html" class="item">MathALEA 2D</a>
      <a href="/mathalea2iep.html" class="item">InstrumEnPoche</a>
      <a href="/mathalea_tuto" class="item">Comment utiliser MathALEA ?</a>
      <a href="/docMathalea2d/presentation" class="item">Comment utiliser MathALEA 2D ?</a>
      <a href="/mathalea_a_propos" class="item">À propos</a>
    </div>
  </div>`
  nav.append(espaceVertical())
  nav.append(espaceVertical())
  document.body.append(nav)

  return nav
}

function footerMathAlea () {
  const footer = create('footer')
  footer.innerHTML = `
   <div class="ui hidden divider"></div>
      <div class="ui hidden divider"></div>
      <div class="ui right aligned container">

        <a href="mailto:contact@coopmaths.fr" style="color: black; padding-right: 2em"><i
            class="mail icon"></i>contact@coopmaths.fr</a>
        <a href="/twitter" targer="_blank" style="color: black; padding-right: 2em"><i
            class="twitter icon"></i>@CoopMaths_fr</a>
        <img class="ui middle aligned image" height="25" src="assets/images/logo2.png">
        <span class="ui header"></span>
      </div>
      <div class="ui hidden divider"></div>
      <div class="ui hidden divider"></div>
      `
  document.body.append(footer)
  return footer
}

function enteteChoixDesExercices () {
  const div = create('div', { id: 'choix_exercices_menu' })
  div.innerHTML = `
  <h3 class="ui block header">Choix des exercices </h3>
      <div class="ui fluid left icon input" data-tooltip="Identifiants des exercices séparés par des virgules"
        data-inverted="">
        <i class="edit icon"></i>
        <input id='choix_des_exercices' type='text'>
      </div>
      <i class="edit icon"></i>
      <div id="choix_exercices_div" data-tooltip="Identifiants des exercices">
        <div class="choix_exo sortable"><span contenteditable="true" class="choix_exercices"></span></div>
      </div>
  `
  return div
}

function espaceVertical () {
  const espace = create('div', { class: 'ui hidden divider' })
  return espace
}

async function fetchHtmltoElement (url, element) {
  const response = await fetch(url)
  element.innerHTML = await response.text()
}
