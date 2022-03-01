import { context } from '../context'
import { afficheScore } from '../gestionInteractif'
import { gestionCan } from './gestionCan'

export function verifQuestionNumerique (exercice, i) {
  let spanReponseLigne, resultat
  if (i < exercice.nbQuestions) {
    spanReponseLigne = document.querySelector(`#resultatCheckEx${exercice.numeroExercice}Q${i}`)
  }
  // On compare le texte avec la réponse attendue en supprimant les espaces pour les deux
  const champTexte = document.getElementById(`champTexteEx${exercice.numeroExercice}Q${i}`)
  if (parseFloat(champTexte.value.replace(/\s/g, '').replace(/,/g, '.')) === exercice.autoCorrection[i].reponse.valeur[0]) {
    spanReponseLigne.innerHTML = '😎'
    resultat = 'OK'
  } else {
    spanReponseLigne.innerHTML = '☹️'
    resultat = 'KO'
  }
  champTexte.readOnly = true
  spanReponseLigne.style.fontSize = 'large'
  return resultat
}

/**
 * Lorsque l'évènement 'exercicesAffiches' est lancé par mathalea.js
 * on vérifie la présence du bouton de validation d'id btnValidationEx{i} créé par listeQuestionsToContenu
 * et on y ajoute un listenner pour vérifier les réponses cochées
 * @param {object} exercice
 */
export function exerciceNumerique (exercice) {
  document.addEventListener('exercicesAffiches', () => {
    if (context.vue === 'can') {
      gestionCan(exercice)
    }
    const button = document.querySelector(`#btnValidationEx${exercice.numeroExercice}-${exercice.id}`)
    if (button) {
      if (!button.hasMathaleaListener) {
        button.addEventListener('click', event => {
          let nbBonnesReponses = 0
          let nbMauvaisesReponses = 0
          for (const i in exercice.autoCorrection) {
            verifQuestionNumerique(exercice, i) === 'OK' ? nbBonnesReponses++ : nbMauvaisesReponses++
          }
          button.classList.add('disabled')
          afficheScore(exercice, nbBonnesReponses, nbMauvaisesReponses)
        })
        button.hasMathaleaListener = true
      }
    }
  })
}
