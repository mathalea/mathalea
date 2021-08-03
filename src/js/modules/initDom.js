/* global $ */
import { context, setOutputAmc, setOutputDiaporama, setOutputHtml, setOutputLatex } from './context'
import { addElement, create, get, addFetchHtmlToParent, fetchHtmlToElement } from './dom'
import { getLogFromUrl, getVueFromUrl } from './gestionUrl'
import { initDiaporama } from './mathaleaDiaporama.js'

export const affichageUniquementExercice = (i) => {
  const listeDivExercices = document.querySelectorAll('[id ^= "exercice"].titreExercice')
  const listeDivExercicesCorr = document.querySelectorAll('[id ^= "divexcorr"].titreExercice')
  for (const element of listeDivExercices) {
    element.style.display = 'none'
  }
  for (const element of listeDivExercicesCorr) {
    element.style.display = 'none'
  }
  if (i !== undefined) {
    listeDivExercices[i].style.display = 'block'
    if (document.getElementById(`score${i}`)) {
      listeDivExercicesCorr[i].style.display = 'block'
    }
  }
}

const masqueEspaces = () => {
  const espaces = document.getElementsByClassName('ui hidden divider')
  for (const espace of espaces) {
    espace.style.display = 'none'
  }
}
const masqueTitreExerciceEtEspaces = () => {
  const titresExercice = document.getElementsByClassName('ui dividing header')
  for (const titre of titresExercice) {
    titre.style.display = 'none'
  }
  masqueEspaces()
}

export async function initDom () {
  // Il FAUT TOUJOURS mettre await avant FetchHtmlToElement sinon la création des formulaires bug car les éléments n'existent pas encore
  const vue = getVueFromUrl()
  if (vue) {
    context.vue = vue
  }
  document.body.innerHTML = ''
  let section
  if (vue === 'recto' || vue === 'verso') {
    setOutputHtml()
    section = addElement(document.body, 'section', { class: 'ui container' })
    addElement(section, 'div', { id: 'containerErreur' })
    await addFetchHtmlToParent('templates/mathaleaExercices.html', section)
    const accordions = document.getElementsByClassName('ui fluid accordion')
    for (const accordion of accordions) {
      accordion.style.visibility = 'hidden'
    }
    const divExercice = get('exercices', false)
    const divCorrection = get('corrections', false)
    divExercice.style.fontSize = '1.5em'
    divCorrection.style.fontSize = '1.5em'
    if (context.vue === 'verso') {
      divExercice.style.display = 'none'
      document.body.appendChild(divCorrection)
    }
    // Le titre de l'exercice ne peut être masqué qu'après l'affichage
    document.addEventListener('exercicesAffiches', masqueTitreExerciceEtEspaces)
    document.addEventListener('exercicesAffiches', () => {
      // Envoi des informations à Anki
      const hauteur = window.document.body.scrollHeight
      window.parent.postMessage({ hauteur: hauteur, reponse: 'A_COMPLETER' }, '*')
    })
  } else if (vue === 'eval') {
    setOutputHtml()
    section = addElement(document.body, 'section', { class: 'ui container' })
    const menuEval = addElement(section, 'div', { id: 'menuEval' })
    addElement(section, 'div', { id: 'containerErreur' })
    await addFetchHtmlToParent('templates/eval.html', section)
    const accordions = document.getElementsByClassName('ui fluid accordion')
    for (const accordion of accordions) {
      accordion.style.visibility = 'hidden'
    }
    addElement(section, 'div', { id: 'corrections' })
    // Attend l'affichage de tous les exercices pour les cacher
    document.addEventListener('exercicesAffiches', () => {
      affichageUniquementExercice(0)
      menuEval.innerHTML = ''
      const listeDivExercices = document.querySelectorAll('[id ^= "exercice"].titreExercice')
      for (let i = 0, element; i < listeDivExercices.length; i++) {
        element = addElement(menuEval, 'button', { id: `btnEx${i + 1}`, style: 'margin: 5px', class: 'circular ui button' })
        element.textContent = `Ex. ${i + 1}`
        if (!element.hasListenner) {
          element.addEventListener('click', () => affichageUniquementExercice(i), false)
          element.hasListenner = true
        }
      }
    })
  } else if (vue === 'latex') {
    await addFetchHtmlToParent('templates/nav.html', document.body, 'nav')
    section = addElement(document.body, 'section', { class: 'ui container' })
    await addFetchHtmlToParent('templates/mathaleaLatex.html', document.body)
    setOutputLatex()
  } else if (vue === 'amc') {
    await addFetchHtmlToParent('templates/nav.html', document.body, 'nav')
    section = addElement(document.body, 'section', { class: 'ui container' })
    await addFetchHtmlToParent('templates/amc.html', document.body)
    setOutputAmc()
  } else if (vue === 'cm') {
    await addFetchHtmlToParent('templates/nav.html', document.body, 'nav')
    section = addElement(document.body, 'section', { class: 'ui container' })
    await addFetchHtmlToParent('templates/cm.html', document.body)
    setOutputDiaporama()
    initDiaporama()
  } else if (vue === 'scores') {
    await addFetchHtmlToParent('templates/nav.html', document.body, 'nav')
    section = addElement(document.body, 'section', { class: 'ui container' })
    section.append(espaceVertical())
    await addFetchHtmlToParent('templates/scores.html', document.body)
  } else { // menuEtEx
    setOutputHtml()
    await addFetchHtmlToParent('templates/nav.html', document.body, 'nav')
    section = addElement(document.body, 'section', { class: 'ui container' })
    section.append(espaceVertical())
    section.append(espaceVertical())
    addElement(section, 'div', { id: 'containerErreur' })
    await addFetchHtmlToParent('templates/mathaleaEnteteChoixDesExercices.html', section, 'div', { id: 'choix_exercices_menu' })
    section.append(espaceVertical())
    const doubleColonne = addElement(section, 'div', { class: 'ui stackable two column grid', dir: 'ltr', id: 'mathaleaContainer' })
    const colonneGauche = addElement(doubleColonne, 'div', { id: 'left', class: 'column', style: 'height:75vh;' })
    const colonneDroite = addElement(doubleColonne, 'div', { id: 'right', class: 'column', style: 'height:75vh; overflowY: auto;' })
    await fetchHtmlToElement('templates/mathaleaGauche.html', colonneGauche)
    await fetchHtmlToElement('templates/mathaleaDroite.html', colonneDroite)
    section.append(espaceVertical())
    section.append(espaceVertical())
    addFetchHtmlToParent('templates/modalScores.html', document.body)
  }
  if (vue === 'recto' || vue === 'verso') {
    await addFetchHtmlToParent('templates/footer1logo.html', document.body, 'footer')
  } else {
    await addFetchHtmlToParent('templates/footer.html', document.body, 'footer')
  }
  if (getLogFromUrl()) {
    await addFetchHtmlToParent('templates/modalLog.html', document.body)
    $('#modalLog').modal('show')
    document.getElementById('scoresInputUserId').focus()
  }
}

function espaceVertical () {
  const espace = create('div', { class: 'ui hidden divider' })
  return espace
}
