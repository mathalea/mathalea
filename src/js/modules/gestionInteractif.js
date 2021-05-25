/* global $ */
import { context } from './context.js'
import { shuffleJusqua } from './outils.js'
import { messageFeedback } from './messages.js'
import { addElement, get, setStyles } from './dom.js'
import { ComputeEngine, parse } from '@cortex-js/math-json'

export function exerciceInteractif (exercice) {
  if (exercice.amcType === 4 || exercice.amcType === 5) questionNumerique(exercice)
  if (exercice.amcType === 1 || exercice.amcType === 2) exerciceQcm(exercice)
  if (exercice.interactifType === 'custom') exerciceCustom(exercice)
  // Pour les exercices de type custom, on appelle la méthode correctionInteractive() définie dans l'exercice
  if (exercice.interactifType === 'mathLive') exerciceMathLive(exercice)
}

/**
 * Lorsque l'évènement 'exercicesAffiches' est lancé par mathalea.js
 * on vérifie la présence du bouton de validation d'id btnValidationEx{i} créé par listeQuestionsToContenu
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
    const button = document.querySelector(`#btnValidationEx${exercice.numeroExercice}`)
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
          if (indiceFeedback > -1 && exercice.autoCorrection[i].propositions[indiceFeedback].feedback) {
            const eltFeedback = get(`feedbackEx${exercice.numeroExercice}Q${i}`, false)
            if (eltFeedback) eltFeedback.innerHTML = ''
            messageFeedback({
              id: `feedbackEx${exercice.numeroExercice}Q${i}`,
              message: exercice.autoCorrection[i].propositions[indiceFeedback].feedback,
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
 * @param {exercice}
 * @param {i} i indice de la question
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
  if (exercice.autoCorrection[i].options !== undefined) {
    if (!exercice.autoCorrection[i].options.ordered) {
      exercice.autoCorrection[i].propositions = shuffleJusqua(exercice.autoCorrection[i].propositions, exercice.autoCorrection[i].options.lastChoice)
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
 * on vérifie la présence du bouton de validation d'id btnValidationEx{i} créé par listeQuestionsToContenu
 * et on y ajoute un listenner pour vérifier les réponses cochées
 * @param {object} exercice
 */
export function questionNumerique (exercice) {
  document.addEventListener('exercicesAffiches', () => {
    const button = document.querySelector(`#btnValidationEx${exercice.numeroExercice}`)
    if (button) {
      button.addEventListener('click', event => {
        // let nbBonnesReponses = 0
        // let nbMauvaisesReponses = 0
        // const nbBonnesReponsesAttendues = exercice.nbQuestions
        for (const i in exercice.autoCorrection) {
          const spanReponseLigne = document.querySelector(`#resultatCheckEx${exercice.numeroExercice}Q${i}`)
          // On compare le texte avec la réponse attendue en supprimant les espaces pour les deux
          const champTexte = document.getElementById(`champTexteEx${exercice.numeroExercice}Q${i}`)
          if (champTexte.value.replaceAll(' ', '') === exercice.autoCorrection[i].reponse.valeur.toString().replaceAll(' ', '').replaceAll('.', ',')) {
            spanReponseLigne.innerHTML = '😎'
            // nbBonnesReponses++
          } else {
            spanReponseLigne.innerHTML = '☹️'
            // nbMauvaisesReponses++
          }
          champTexte.readOnly = true
          spanReponseLigne.style.fontSize = 'large'
        }
        button.classList.add('disabled')
      })
    }
  })
}

/**
 *
 * @param {Exercice} exercice
 * @param {number} i
 * @param {*} param2
 * @returns {string} code HTML du champ texte avec identifiant champTexteEx__Q__ et le span pour le résultat de la question
 */
export function ajouteChampTexte (exercice, i, { texte = '', texteApres = '', inline = true, numeric = true, indice } = {}) {
  if (context.isHtml && exercice.interactif) {
    return `<div class="ui form ${inline ? 'inline' : ''}" >
      <div class="inline  field" >
      <label>${texte}</label>
        <input type="text" ${numeric ? 'type="number" min="0" inputmode="numeric" pattern="[0-9]*"' : ''}  id="champTexteEx${exercice.numeroExercice}Q${i}${indice || ''}" >
        <span>${texteApres}</span>
        <span id="resultatCheckEx${exercice.numeroExercice}Q${i}"></span>
      </div>
      </div>`
  } else {
    return ''
  }
}
export function ajouteChampTexteLiveMath (exercice, i) {
  if (context.isHtml && exercice.interactif) {
    return `<math-field virtual-keyboard-mode=manual id="champTexteEx${exercice.numeroExercice}Q${i}"></math-field><div style="margin-top:10px" id="resultatCheckEx${exercice.numeroExercice}Q${i}"></div>`
  } else {
    return ''
  }
}

/**
 * Précise la réponse attendue
 * @param {'objet exercice'} exercice
 * @param {'numero de la question'} i
 * @param {array || number} a
 */
export function setReponse (exercice, i, valeurs, { digits = 0, decimals = 0, signe = false, exposantNbChiffres = 0, exposantSigne = false, approx = 0 } = {}) {
  let reponses = []
  if (!Array.isArray(valeurs)) {
    reponses = [valeurs]
  } else {
    reponses = valeurs
  }
  if (exercice.autoCorrection[i] === undefined) {
    exercice.autoCorrection[i] = {}
  }
  if (exercice.autoCorrection[i].reponse === undefined) {
    exercice.autoCorrection[i].reponse = {}
  }
  exercice.autoCorrection[i].reponse.param = { digits: digits, decimals: decimals, signe: signe, exposantNbChiffres: exposantNbChiffres, exposantSigne: exposantSigne, approx: approx }
  exercice.autoCorrection[i].reponse.valeur = reponses
}

/**
 * Lorsque l'évènement 'exercicesAffiches' est lancé par mathalea.js
 * on vérifie la présence du bouton de validation d'id btnValidationEx{i} créé par listeQuestionsToContenu
 * et on y ajoute un listenner pour vérifier les réponses cochées
 * @param {object} exercice
 */
export function exerciceCustom (exercice) {
  document.addEventListener('exercicesAffiches', () => {
    const button = document.querySelector(`#btnValidationEx${exercice.numeroExercice}`)
    if (button) {
      button.addEventListener('click', event => {
        // Le get est non strict car on sait que l'élément n'existe pas à la première itération de l'exercice
        let eltFeedback = get(`feedbackEx${exercice.numeroExercice}`, false)
        // On ajoute le div pour le feedback
        if (!eltFeedback) {
          const eltExercice = get(`exercice${exercice.numeroExercice}`)
          eltFeedback = addElement(eltExercice, 'div', { id: `feedbackEx${exercice.numeroExercice}` })
        }
        setStyles(eltFeedback, 'marginBottom: 20px')
        if (eltFeedback) eltFeedback.innerHTML = ''
        // On utilise la correction définie dans l'exercice
        exercice.correctionInteractive(eltFeedback)
        button.classList.add('disabled')
      })
    }
  })
}

/**
 * Lorsque l'évènement 'exercicesAffiches' est lancé par mathalea.js
 * on vérifie la présence du bouton de validation d'id btnValidationEx{i} créé par listeQuestionsToContenu
 * et on y ajoute un listenner pour vérifier les réponses saisies dans les math-field
 * @param {object} exercice
 */
export function exerciceMathLive (exercice) {
  const engine = new ComputeEngine()
  document.addEventListener('exercicesAffiches', () => {
    const button = document.querySelector(`#btnValidationEx${exercice.numeroExercice}`)
    if (button) {
      button.addEventListener('click', event => {
        // let nbBonnesReponses = 0
        // let nbMauvaisesReponses = 0
        // const nbBonnesReponsesAttendues = exercice.nbQuestions
        for (const i in exercice.autoCorrection) {
          const spanReponseLigne = document.querySelector(`#resultatCheckEx${exercice.numeroExercice}Q${i}`)
          // On compare le texte avec la réponse attendue en supprimant les espaces pour les deux
          const champTexte = document.getElementById(`champTexteEx${exercice.numeroExercice}Q${i}`)
          let reponses = []
          if (!Array.isArray(exercice.autoCorrection[i].reponse.valeur)) {
            reponses = [exercice.autoCorrection[i].reponse.valeur]
          } else {
            reponses = exercice.autoCorrection[i].reponse.valeur
          }
          let resultat = 'KO'
          let saisie = champTexte.value
          for (let reponse of reponses) {
            // Pour le calcul littéral on remplace dfrac en frac
            if (typeof reponse === 'string') {
              reponse = reponse.replaceAll('dfrac', 'frac')
              // A réfléchir, est-ce qu'on considère que le début est du brouillon ?
              // saisie = neTientCompteQueDuDernierMembre(saisie)
            }
            // Pour le calcul numérique, on transforme la saisie en nombre décimal
            if (typeof reponse === 'number') saisie = saisie.toString().replace(',', '.')
            console.log(engine.canonical(parse(saisie)), engine.canonical(parse(reponse)))
            if (engine.same(
              engine.canonical(parse(saisie)),
              engine.canonical(parse(reponse))
            )) resultat = 'OK'
          }
          if (resultat === 'OK') {
            spanReponseLigne.innerHTML = '😎'
            // nbBonnesReponses++
          } else {
            spanReponseLigne.innerHTML = '☹️'
            // nbMauvaisesReponses++
          }
          champTexte.readOnly = true
          spanReponseLigne.style.fontSize = 'large'
        }
        button.classList.add('disabled')
      })
    }
  })
}

// function neTientCompteQueDuDernierMembre (texte) {
//   const i = texte.lastIndexOf('=')
//   if (i > -1) {
//     return texte.substring(i + 1)
//   } else {
//     return texte
//   }
// }
