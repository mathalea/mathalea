import { context } from '../context.js'
import { afficheScore } from '../gestionInteractif.js'
import { addElement, get, setStyles } from '../dom.js'
import { gestionCan } from './gestionCan.js'

export function mouseOverSvgEffect () {
  this.style.border = '1px solid #1DA962'
}
export function mouseOutSvgEffect () {
  this.style.border = 'none'
}
export function mouseSvgClick () {
  if (this.etat) {
    // Déja choisi, donc on le réinitialise
    this.style.border = 'none'
    this.addEventListener('mouseover', mouseOverSvgEffect)
    this.addEventListener('mouseout', mouseOutSvgEffect)
    this.addEventListener('click', mouseSvgClick)
    this.etat = false
  } else {
    // Passe à l'état choisi donc on désactive les listenners pour over et pour out
    this.removeEventListener('mouseover', mouseOverSvgEffect)
    this.removeEventListener('mouseout', mouseOutSvgEffect)
    this.style.border = '3px solid #f15929'
    this.etat = true
  }
}

export function verifQuestionCliqueFigure (exercice, i) {
  // Le get est non strict car on sait que l'élément n'existe pas à la première itération de l'exercice
  let eltFeedback = get(`resultatCheckEx${exercice.numeroExercice}Q${i}`, false)
  // On ajoute le div pour le feedback
  if (!eltFeedback) {
    const eltExercice = get(`exercice${exercice.numeroExercice}`)
    eltFeedback = addElement(eltExercice, 'div', { id: `resultatCheckEx${exercice.numeroExercice}Q${i}` })
  }
  setStyles(eltFeedback, 'marginBottom: 20px')
  if (eltFeedback) eltFeedback.innerHTML = ''
  const figures = []
  let erreur = false // Aucune erreur détectée
  let nbFiguresCliquees = 0
  for (const objetFigure of exercice.figures[i]) {
    const eltFigure = document.getElementById(objetFigure.id)
    figures.push(eltFigure)
    eltFigure.removeEventListener('mouseover', mouseOverSvgEffect)
    eltFigure.removeEventListener('mouseout', mouseOutSvgEffect)
    eltFigure.removeEventListener('click', mouseSvgClick)
    eltFigure.hasMathaleaListener = false
    if (eltFigure.etat) nbFiguresCliquees++
    if (eltFigure.etat !== objetFigure.solution) erreur = true
  }
  if (nbFiguresCliquees > 0 && !erreur) {
    eltFeedback.innerHTML = '😎'
    return 'OK'
  } else {
    eltFeedback.innerHTML = '☹️'
    return 'KO'
  }
}

export function exerciceCliqueFigure (exercice) {
  document.addEventListener('exercicesAffiches', () => {
    if (context.vue === 'can') {
      gestionCan(exercice)
    }
    // Dès que l'exercice est affiché, on rajoute des listenners sur chaque éléments de this.figures.
    for (let i = 0; i < exercice.nbQuestions; i++) {
      for (const objetFigure of exercice.figures[i]) {
        const figSvg = document.getElementById(objetFigure.id)
        if (figSvg) {
          if (!figSvg.hasMathaleaListener) {
            figSvg.addEventListener('mouseover', mouseOverSvgEffect)
            figSvg.addEventListener('mouseout', mouseOutSvgEffect)
            figSvg.addEventListener('click', mouseSvgClick)
            figSvg.etat = false
            figSvg.style.margin = '10px'
            figSvg.hasMathaleaListener = true
            // On enregistre que l'élément a déjà un listenner pour ne pas lui remettre le même à l'appui sur "Nouvelles Données"
          }
        }
      }
    }
    // Gestion de la correction
    const button = document.querySelector(`#btnValidationEx${exercice.numeroExercice}-${exercice.id}`)
    if (button) {
      if (!button.hasMathaleaListener) {
        button.addEventListener('click', event => {
          let nbBonnesReponses = 0
          let nbMauvaisesReponses = 0
          for (let i = 0; i < exercice.nbQuestions; i++) {
            verifQuestionCliqueFigure(exercice, i) === 'OK' ? nbBonnesReponses++ : nbMauvaisesReponses++
          }
          afficheScore(exercice, nbBonnesReponses, nbMauvaisesReponses)
        })
        button.hasMathaleaListener = true
      }
    }
  })
}
