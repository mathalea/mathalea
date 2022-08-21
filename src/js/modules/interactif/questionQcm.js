/* global $ */

import { get } from '../dom.js'
import { messageFeedback } from '../messages.js'
import { shuffleJusqua } from '../outils.js'
import { context } from '../context.js'
import { gestionCan } from './gestionCan.js'
import { afficheScore } from '../gestionInteractif.js'

export function verifQuestionQcm (exercice, i) {
  let resultat
  const monRouge = 'rgba(217, 30, 24, 0.5)'
  const monVert = 'rgba(123, 239, 178, 0.5)'
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
  let aucuneMauvaiseReponseDonnee = true
  exercice.autoCorrection[i].propositions.forEach((proposition, indice) => {
    const label = document.querySelector(`#labelEx${exercice.numeroExercice}Q${i}R${indice}`)
    const check = document.querySelector(`#checkEx${exercice.numeroExercice}Q${i}R${indice}`)
    if (proposition.statut) {
      if (check.checked) {
        nbBonnesReponses++
        if (aucuneMauvaiseReponseDonnee) {
          indiceFeedback = indice
          label.style.backgroundColor = monVert
        }
      } else { // Bonnes réponses non cochées
        label.style.backgroundColor = monVert
      }
    } else if (check.checked === true) {
      label.style.backgroundColor = monRouge
      nbMauvaisesReponses++
      indiceFeedback = indice
      aucuneMauvaiseReponseDonnee = false
    }
  })
  let typeFeedback = 'positive'
  if (nbMauvaisesReponses === 0 && nbBonnesReponses === nbBonnesReponsesAttendues) {
    spanReponseLigne.innerHTML = '😎'
    resultat = 'OK'
  } else {
    spanReponseLigne.innerHTML = '☹️'
    typeFeedback = 'error'
    resultat = 'KO'
  }
  spanReponseLigne.style.fontSize = 'large'
  if (indiceFeedback > -1 && exercice.autoCorrection[i].propositions[indiceFeedback].feedback) {
    const eltFeedback = get(`feedbackEx${exercice.numeroExercice}Q${i}`, false)
    if (eltFeedback) eltFeedback.innerHTML = ''
    // Message par défaut qui est celui de la dernière réponse cochée
    let message = exercice.autoCorrection[i].propositions[indiceFeedback].feedback
    if (resultat === 'KO') {
      // Juste mais incomplet
      if (nbBonnesReponses > 0 && nbBonnesReponses < nbBonnesReponsesAttendues) {
        message = `${nbBonnesReponses} bonne${nbBonnesReponses > 1 ? 's' : ''} réponse${nbBonnesReponses > 1 ? 's' : ''} mais c'est incomplet.`
      }
      // Du juste et du faux
      if (nbBonnesReponses > 0 && nbMauvaisesReponses > 0) {
        message = `${nbMauvaisesReponses} erreur${nbMauvaisesReponses > 1 ? 's' : ''}`
      }
    }
    messageFeedback({
      id: `feedbackEx${exercice.numeroExercice}Q${i}`,
      message,
      type: typeFeedback
    })
  }
  return resultat
}

/**
 * @param {exercice}
 * @param {i} i indice de la question
 * @returns {object} {texte, texteCorr} le texte à ajouter pour la question traitée
 */
export function propositionsQcm (exercice, i) {
  let texte = ''
  let texteCorr = ''
  let espace = ''
  let nbCols = 1; let vertical = false
  if (context.isAmc) return { texte: '', texteCorr: '' }
  if (context.isHtml) {
    espace = '&emsp;'
  } else {
    espace = '\\qquad'
  }
  // Mélange les propositions du QCM sauf celles à partir de lastchoice (inclus)
  if (exercice.autoCorrection[i].options !== undefined) {
    vertical = exercice.autoCorrection[i].options.vertical // est-ce qu'on veut une présentation en colonnes ?
    nbCols = exercice.autoCorrection[i].options.nbCols > 1 ? exercice.autoCorrection[i].options.nbCols : 1 // Nombre de colonnes avant de passer à la ligne
    if (!exercice.autoCorrection[i].options.ordered) {
      exercice.autoCorrection[i].propositions = shuffleJusqua(exercice.autoCorrection[i].propositions, exercice.autoCorrection[i].options.lastChoice)
    }
  } else { // Si les options ne sont pas définies, on mélange
    exercice.autoCorrection[i].propositions = shuffleJusqua(exercice.autoCorrection[i].propositions)
  }
  // On regarde si il n'y a pas de doublons dans les propositions de réponse. Si c'est le cas, on enlève les mauvaises réponses en double.
  elimineDoublons(exercice.autoCorrection[i].propositions)
  if (context.isHtml) {
    texte += `<br>  <form id="formEx${exercice.numeroExercice}Q${i}">`
    texte += '<table>\n\t'
    if (vertical) {
      texte += '<tr>\n\t'
    }
  } else {
    texte += nbCols === 1 ? '\t' : `\n\n\\begin{multicols}{${nbCols}}\n\t`
  }
  for (let rep = 0; rep < exercice.autoCorrection[i].propositions.length; rep++) {
    if (context.isHtml) {
      if (vertical && (rep % nbCols === 0) && rep > 0) {
        texte += '</tr>\n<tr>\n'
      }
      texte += '<td>\n'
      if (exercice.interactif) {
        texte += `<div class="ui checkbox ex${exercice.numeroExercice} monQcm">
            <input type="checkbox" tabindex="0" class="hidden" id="checkEx${exercice.numeroExercice}Q${i}R${rep}">
            <label id="labelEx${exercice.numeroExercice}Q${i}R${rep}">${exercice.autoCorrection[i].propositions[rep].texte + espace}</label>
          </div>`
      } else {
        texte += `$\\square\\;$ ${exercice.autoCorrection[i].propositions[rep].texte}` + espace + '</td>\n'
        if (nbCols > 1 && vertical) {
          texte += '\n\t'
        }
      }
      if (exercice.autoCorrection[i].propositions[rep].statut) {
        texteCorr += `$\\blacksquare\\;$ ${exercice.autoCorrection[i].propositions[rep].texte}` + espace
      } else {
        texteCorr += `$\\square\\;$ ${exercice.autoCorrection[i].propositions[rep].texte}` + espace
      }
    } else {
      texte += `$\\square\\;$ ${exercice.autoCorrection[i].propositions[rep].texte}` + espace
      if (nbCols > 1 && vertical) {
        texte += '\\\\\n\t'
      }
      if (exercice.autoCorrection[i].propositions[rep].statut) {
        texteCorr += `$\\blacksquare\\;$ ${exercice.autoCorrection[i].propositions[rep].texte}` + espace
      } else {
        texteCorr += `$\\square\\;$ ${exercice.autoCorrection[i].propositions[rep].texte}` + espace
      }
    }
  }
  if (context.isHtml) {
    if (vertical) {
      texte += '</tr>\n\t'
    }
    texte += '</table>\n\t'
    texte += `<span id="resultatCheckEx${exercice.numeroExercice}Q${i}"></span>`
    texte += `\n<div id="feedbackEx${exercice.numeroExercice}Q${i}"></div></form>`
  } else {
    texte += nbCols === 1 ? '' : '\\end{multicols}'
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
export function exerciceQcm (exercice) {
  document.addEventListener('exercicesAffiches', () => {
    // On active les checkbox
    $('.ui.checkbox').checkbox()
    // On vérifie le type si jamais il a été changé après la création du listenner (voir 5R20)
    if (exercice.interactifType === 'qcm') {
      if (context.vue === 'can') {
        gestionCan(exercice)
      }
      const button = document.querySelector(`#btnValidationEx${exercice.numeroExercice}-${exercice.id}`)
      if (button) {
        if (!button.hasMathaleaListener) {
          button.addEventListener('click', event => {
            let nbQuestionsValidees = 0
            let nbQuestionsNonValidees = 0
            for (let i = 0; i < exercice.autoCorrection.length; i++) {
              const resultat = verifQuestionQcm(exercice, i)
              resultat === 'OK' ? nbQuestionsValidees++ : nbQuestionsNonValidees++
            }
            const uichecks = document.querySelectorAll(`.ui.checkbox.ex${exercice.numeroExercice}`)
            uichecks.forEach(function (uicheck) {
              uicheck.classList.add('read-only')
            })
            button.classList.add('disabled')
            afficheScore(exercice, nbQuestionsValidees, nbQuestionsNonValidees)
          })
          button.hasMathaleaListener = true
        }
      }
    }
  })
}
