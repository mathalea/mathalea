/* global $ */
import { context } from './context.js'
import { shuffleJusqua } from './outils.js'
import { messageFeedback } from './messages.js'

/**
 * Lorsque l'évènement 'exercicesAffiches' est lancé par mathalea.js
 * on vérifie la présence du bouton de validation d'id btnQcmEx{i} créé par listeQuestionsToContenu
 * et on y ajoute un listenner pour vérifier les réponses cochées
 * @param {object} exercice
 */
export function exerciceQcm (exercice) {
  document.addEventListener('exercicesAffiches', () => {
    // On active les checkbox
    $('.ui.checkbox').checkbox()
    // Couleur pour surligner les label avec une opacité de 50%
    const monRouge = 'rgba(217, 30, 24, 0.5)'
    const monVert = 'rgba(123, 239, 178, 0.5)'
    const button = document.querySelector(`#btnQcmEx${exercice.numeroExercice}`)
    if (button) {
      button.addEventListener('click', event => {
        for (let i = 0; i < exercice.nbQuestions; i++) {
          // i est l'indice de la question
          let nbBonnesReponses = 0
          let nbMauvaisesReponses = 0
          let nbBonnesReponsesAttendues = 0
          let indiceFeedback
          // Compte le nombre de réponses justes attendues
          for (let k = 0; k < exercice.autoCorrection[i].propositions.length; k++) {
            if (exercice.autoCorrection[i].propositions[k].statut) nbBonnesReponsesAttendues++
          }
          const spanReponseLigne = document.querySelector(`#resultatCheckEx${exercice.numeroExercice}Q${i}`)
          exercice.autoCorrection[i].propositions.forEach((proposition, indice) => {
            const label = document.querySelector(`#labelEx${exercice.numeroExercice}Q${i}R${indice}`)
            const check = document.querySelector(`#checkEx${exercice.numeroExercice}Q${i}R${indice}`)
            if (proposition.statut) {
              label.style.backgroundColor = monVert
              if (check.checked) {
                nbBonnesReponses++
                indiceFeedback = indice
              }
            } else if (check.checked === true) {
              label.style.backgroundColor = monRouge
              nbMauvaisesReponses++
              indiceFeedback = indice
            }
          })
          let typeFeedback = 'positive'
          if (nbMauvaisesReponses === 0 && nbBonnesReponses === nbBonnesReponsesAttendues) {
            spanReponseLigne.innerHTML = '😎'
          } else {
            spanReponseLigne.innerHTML = '☹️'
            typeFeedback = 'error'
          }
          spanReponseLigne.style.fontSize = 'large'
          if (indiceFeedback > -1) {
            messageFeedback({
              id: `feedbackEx${exercice.numeroExercice}Q${i}`,
              texte: exercice.autoCorrection[i].propositions[indiceFeedback].feedback,
              type: typeFeedback
            })
          }
        }
        const uichecks = document.querySelectorAll(`.ui.checkbox.ex${exercice.numeroExercice}`)
        uichecks.forEach(function (uicheck) {
          uicheck.classList.add('read-only')
        })
        button.classList.add('disabled')
      })
    }
  })
}

/**
 * @param {int} numeroExercice Indice de l'exercice
 * @param {int} i Indice de la question
 * @param {*} tabrep Tableau des propositions
 * @param {*} tabicone Tableau ordonné comme tabrep avec 0 si la proposition est fausse et 1 si la proposition est juste
 * @returns {object} {texte, texteCorr} le texte à ajouter pour la question traitée
 */
export function propositionsQcm (exercice, i) {
  exercice.titre = 'cacaboudin'
  let texte = ''
  let texteCorr = ''
  let espace = ''
  if (context.isHtml) {
    espace = '&emsp;'
  } else {
    espace = '\\qquad'
  }
  // Mélange les propositions du QCM sauf celles à partir de lastchoice (inclus)
  if (exercice.autoCorrection[i].propositions.options !== undefined) {
    if (!exercice.autoCorrection[i].propositions.options.ordered) {
      exercice.autoCorrection[i].propositions = shuffleJusqua(exercice.autoCorrection[i].propositions, exercice.autoCorrection[i].propositions.options.lastChoice)
    }
  } else { // Si les options ne sont pas définies, on mélange
    exercice.autoCorrection[i].propositions = shuffleJusqua(exercice.autoCorrection[i].propositions)
  }
  elimineDoublons(exercice.autoCorrection[i].propositions)
  if (!context.isAmc) {
    if (context.isHtml) {
      texte += `<br>  <form id="formEx${exercice.numeroExercice}Q${i}">`
    } else {
      texte += '<br>'
    }
    for (let rep = 0; rep < exercice.autoCorrection[i].propositions.length; rep++) {
      if (context.isHtml) {
        texte += `<div class="ui checkbox ex${exercice.numeroExercice} monQcm">
            <input type="checkbox" tabindex="0" class="hidden" id="checkEx${exercice.numeroExercice}Q${i}R${rep}">
            <label id="labelEx${exercice.numeroExercice}Q${i}R${rep}">${exercice.autoCorrection[i].propositions[rep].texte + espace}</label>
          </div>`
      } else {
        texte += `$\\square\\;$ ${exercice.autoCorrection[i].propositions[rep].texte}` + espace
      }
      if (exercice.autoCorrection[i].propositions[rep].statut) {
        texteCorr += `$\\blacksquare\\;$ ${exercice.autoCorrection[i].propositions[rep].texte}` + espace
      } else {
        texteCorr += `$\\square\\;$ ${exercice.autoCorrection[i].propositions[rep].texte}` + espace
      }
    }
    if (context.isHtml) {
      texte += `<span id="resultatCheckEx${exercice.numeroExercice}Q${i}"></span>`
      texte += `\n<div id="feedbackEx${exercice.numeroExercice}Q${i}"></span></form>`
    }
  }
  return { texte: texte, texteCorr: texteCorr }
}

/**
 * prend un tableau de propositions [{texte: 'prop1', statut: true, feedback: 'Correct !'}, {texte: 'prop2', statut: false, ....}
 * élimine en cas de doublon la proposition fausse ou la deuxième proposition si elle sont toutes les deux fausses.
 * @author Jean-Claude Lhote
 */
export function elimineDoublons (propositions) { // fonction qui va éliminer les doublons si il y en a
  let doublonsTrouves = false
  for (let i = 0; i < propositions.length - 1; i++) {
    for (let j = i + 1; j < propositions.length;) {
      if (propositions[i].texte === propositions[j].texte) {
        // les réponses i et j sont les mêmes
        doublonsTrouves = true
        if (propositions[i].statut) { // si la réponse i est bonne, on vire la j
          propositions.splice(j, 1)
        } else if (propositions[j].statut) { // si la réponse i est mauvaise et la réponse j bonne,
          // comme ce sont les mêmes réponses, on vire la j mais on met la i bonne
          propositions.splice(j, 1)
          propositions[i].statut = true
        } else { // Les deux réponses sont mauvaises
          propositions.splice(j, 1)
        }
      } else {
        j++
      }
    }
  }
  return doublonsTrouves
}

/**
 * Lorsque l'évènement 'exercicesAffiches' est lancé par mathalea.js
 * on vérifie la présence du bouton de validation d'id btnQcmEx{i} créé par listeQuestionsToContenu
 * et on y ajoute un listenner pour vérifier les réponses cochées
 * @param {object} exercice
 */
export function questionNumerique (exercice) {
  document.addEventListener('exercicesAffiches', () => {
    const button = document.querySelector(`#btnQcmEx${exercice.numeroExercice}`)
    if (button) {
      button.addEventListener('click', event => {
        let nbBonnesReponses = 0
        let nbMauvaisesReponses = 0
        const nbBonnesReponsesAttendues = exercice.nbQuestions
        for (const i in exercice.autoCorrection) {
          const spanReponseLigne = document.querySelector(`#resultatCheckEx${exercice.numeroExercice}Q${i}`)
          if (document.getElementById(`champTexteEx${exercice.numeroExercice}Q${i}`).value === exercice.autoCorrection[i].reponse.valeur.toString()) {
            spanReponseLigne.innerHTML = '😎'
            nbBonnesReponses++
          } else {
            spanReponseLigne.innerHTML = '☹️'
            nbMauvaisesReponses++
          }
          spanReponseLigne.style.fontSize = 'large'
        }
      })
    }
  })
}

export function ajoutChampTexte ({ texte = '', texteApres = '', numeroExercice, i, inline = true } = {}) {
  if (context.isHtml) {
    return `<div class="ui form ${inline ? 'inline' : ''}" >
    <div class="inline  field" >
    <label>${texte}</label>
      <input type="text" id="champTexteEx${numeroExercice}Q${i}" >
      <span>${texteApres}</span>
      <span id="resultatCheckEx${numeroExercice}Q${i}"></span>
    </div>
    </div>`
  }
}

export function exerciceInteractif (exercice) {
  if (exercice.amcType === 4) questionNumerique(exercice)
  if (exercice.amcType === 1) exerciceQcm(exercice)
  if (exercice.amcType === 2) exerciceQcm(exercice) // Avec des paramètres différents ??? @jeanClaude, qu'en penses-tu ?
}
