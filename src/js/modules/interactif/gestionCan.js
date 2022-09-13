import { context } from '../context.js'
import { addElement, get } from '../dom.js'
import { verifQuestionCliqueFigure } from './cliqueFigure.js'
import { isUserIdOk } from './isUserIdOk.js'
import { verifQuestionMathLive } from './questionMathLive.js'
import { verifQuestionQcm } from './questionQcm.js'

export function gestionCan (exercice) {
  context.nbBonnesReponses = 0
  context.nbMauvaisesReponses = 0
  for (let i = 0; i < exercice.nbQuestions; i++) {
    const button1question = document.querySelector(`#boutonVerifexercice${exercice.numeroExercice}Q${i}`)
    if (button1question) {
      if (!button1question.hasMathaleaListener) {
        button1question.addEventListener('click', () => {
          let resultat
          if (exercice.interactifType === 'mathLive') {
            resultat = verifQuestionMathLive(exercice, i).resultat
          }
          if (exercice.interactifType === 'qcm') {
            resultat = verifQuestionQcm(exercice, i)
          }
          if (exercice.interactifType === 'cliqueFigure') {
            resultat = verifQuestionCliqueFigure(exercice, i)
          }
          if (exercice.interactifType === 'custom') {
            resultat = exercice.correctionInteractive(i)
          }
          // Mise en couleur du numéro de la question dans le menu du haut
          if (resultat === 'OK') {
            document.getElementById(`btnMenuexercice${exercice.numeroExercice}Q${i}`).classList.add('green')
            context.nbBonnesReponses++
          }
          if (resultat === 'KO') {
            document.getElementById(`btnMenuexercice${exercice.numeroExercice}Q${i}`).classList.add('red')
            context.nbMauvaisesReponses++
          }
          if (resultat === 'OK' || resultat === 'KO') {
            button1question.classList.add('disabled')
            if (exercicesCanRestants().length) {
              exercicesCanDispoApres().click()
            } else {
              afficheScoreCan(exercice, context.nbBonnesReponses, context.nbMauvaisesReponses)
            }
          }
        })
        button1question.hasMathaleaListener = true
      }
    }
  }
}

const exercicesCanRestants = () => document.querySelectorAll('[id ^= "btnMenuexercice"].circular.ui.button:not(.green):not(.red)')
const exercicesCanDispoApres = () => {
  const liste = Array.from(document.querySelectorAll('[id^=btnMenu]'))
  for (let i = parseInt(context.questionCanEnCours); i < liste.length; i++) {
    if (!liste[i].classList.contains('red') && !liste[i].classList.contains('green')) {
      return liste[i]
    }
  }
  return exercicesCanRestants()[0]
}

export function afficheScoreCan (exercice, nbBonnesReponses, nbMauvaisesReponses) {
  // const exercice = { id: 'can', sup: document.location.href + 'serie=' + context.graine }
  const divScore = addElement(document.querySelector('#menuEval'), 'div', { className: 'score', id: 'scoreTotal' })
  divScore.innerHTML = `Résultat : ${nbBonnesReponses} / ${nbBonnesReponses + nbMauvaisesReponses}`
  window.parent.postMessage({ url: window.location.href, graine: context.graine, titre: exercice.titre, nbBonnesReponses: nbBonnesReponses, nbMauvaisesReponses: nbMauvaisesReponses }, '*')
  // Arrête le timer
  if (context.timer) {
    clearInterval(context.timer)
    // ToDo à sauvegarder dans les résultats
    // const tempsRestant = document.getElementById('timer').innerText
  }
  divScore.style.color = '#f15929'
  divScore.style.fontWeight = 'bold'
  divScore.style.fontSize = 'xx-large'
  divScore.style.marginTop = '20px'
  document.querySelectorAll('[id^=divexcorr]').forEach(e => {
    e.style.display = 'block'
  })
  const divCorr = get('corrections')
  divCorr.style.display = 'block'
  document.getElementById('btnMenuexercice0Q0').click()
  isUserIdOk(exercice, nbBonnesReponses, nbMauvaisesReponses)
}
