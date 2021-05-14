/* global $ */
import { context } from './context.js'

/**
 * Lorsque l'évènement 'exercicesAffiches' est lancé par mathalea.js
 * on vérifie la présence du bouton de validation d'id btnQcmEx{i} créé par listeQuestionsToContenu
 * et on y ajoute un listenner pour vérifier les réponses cochées
 * @param {object} exercice
 */
export function gestionQcmInteractif (exercice) {
  document.addEventListener('exercicesAffiches', () => {
    // On active les checkbox
    $('.ui.checkbox').checkbox()
    const monRouge = 'rgba(217, 30, 24, 0.5)'
    const monVert = 'rgba(123, 239, 178, 0.5)'
    const button = document.querySelector(`#btnQcmEx${exercice.numeroExercice}`)
    if (button) {
      button.addEventListener('click', event => {
        for (let i = 0; i < exercice.nbQuestions; i++) {
          let nbBonnesReponses = 0
          let nbMauvaisesReponses = 0
          const nbBonnesReponsesAttendues = exercice.tableauSolutionsDuQcm[i].reduce((a, b) => a + b, 0)
          const spanReponseLigne = document.querySelector(`#resultatCheckEx${exercice.numeroExercice}Q${i}`)
          exercice.tableauSolutionsDuQcm[i].forEach((solution, rep) => {
            const label = document.querySelector(`#labelEx${exercice.numeroExercice}Q${i}R${rep}`)
            const check = document.querySelector(`#checkEx${exercice.numeroExercice}Q${i}R${rep}`)
            if (solution === 1) {
              label.style.backgroundColor = monVert
              if (check.checked) {
                nbBonnesReponses++
              }
            } else if (check.checked === true) {
              label.style.backgroundColor = monRouge
              nbMauvaisesReponses++
            }
          })
          if (nbMauvaisesReponses === 0 && nbBonnesReponses === nbBonnesReponsesAttendues) {
            spanReponseLigne.innerHTML = '😎'
          } else {
            spanReponseLigne.innerHTML = '☹️'
          }
          spanReponseLigne.style.fontSize = 'large'
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
export function propositionsQcm (numeroExercice, i, tabrep, tabicone) {
  let texte = ''
  let texteCorr = ''
  let espace = ''
  if (context.isHtml) {
    espace = '&emsp;'
  } else {
    espace = '\\qquad'
  }
  if (!context.isAmc) {
    if (context.isHtml) {
      texte += `<br>  <form id="formEx${numeroExercice}Q${i}">`
    } else {
      texte += '<br>'
    }
    for (let rep = 0; rep < tabrep.length; rep++) {
      if (context.isHtml) {
        texte += `<div class="ui checkbox ex${numeroExercice} monQcm">
            <input type="checkbox" tabindex="0" class="hidden" id="checkEx${numeroExercice}Q${i}R${rep}">
            <label id="labelEx${numeroExercice}Q${i}R${rep}">${tabrep[rep] + espace}</label>
          </div>`
      } else {
        texte += `$\\square\\;$ ${tabrep[rep]}` + espace
      }
      if (tabicone[rep] === 1) {
        texteCorr += `$\\blacksquare\\;$ ${tabrep[rep]}` + espace
      } else {
        texteCorr += `$\\square\\;$ ${tabrep[rep]}` + espace
      }
    }
    if (context.isHtml) {
      texte += `<span id="resultatCheckEx${numeroExercice}Q${i}"></span></form>`
    }
  }
  return { texte: texte, texteCorr: texteCorr }
}

/**
 * prend un objet {reponse=[a,b,c,d,e],statuts=[1,0,0,0,0]}
 * élimine les doublons de réponses et les statuts associés avant de retourner l'objet épuré.
 * @author Jean-Claude Lhote
 */
export function elimineDoublons (reponses, statuts) { // fonction qui va éliminer les doublons si il y en a
  const reponsesEpurees = reponses.slice()
  const statutsEpures = statuts.slice()
  for (let i = 0; i < reponsesEpurees.length - 1; i++) {
    for (let j = i + 1; j < reponsesEpurees.length;) {
      if (reponsesEpurees[i] === reponsesEpurees[j]) {
        console.log('doublon trouvé', reponsesEpurees[i], reponsesEpurees[j]) // les réponses i et j sont les mêmes

        if (statutsEpures[i] === 1) { // si la réponse i est bonne, on vire la j
          reponsesEpurees.splice(j, 1)
          statutsEpures.splice(j, 1)
        } else if (statutsEpures[j] === 1) { // si la réponse i est mauvaise et la réponse j bonne,
          // comme ce sont les mêmes réponses, on vire la j mais on met la i bonne
          reponsesEpurees.splice(j, 1)
          statutsEpures.splice(j, 1)
          statutsEpures[i] = 1
        } else { // Les deux réponses sont mauvaises
          reponsesEpurees.splice(j, 1)
          statutsEpures.splice(j, 1)
        }
      } else {
        j++
      }
    }
  }
  return [reponsesEpurees, statutsEpures]
}

/**
 * Lorsque l'évènement 'exercicesAffiches' est lancé par mathalea.js
 * on vérifie la présence du bouton de validation d'id btnQcmEx{i} créé par listeQuestionsToContenu
 * et on y ajoute un listenner pour vérifier les réponses cochées
 * @param {object} exercice
 */
export function exerciceInteractif (exercice) {
  document.addEventListener('exercicesAffiches', () => {
    // On active les checkbox
    // $('.ui.checkbox').checkbox()
    const monRouge = 'rgba(217, 30, 24, 0.5)'
    const monVert = 'rgba(123, 239, 178, 0.5)'
    const button = document.querySelector(`#btnQcmEx${exercice.numeroExercice}`)
    if (button) {
      button.addEventListener('click', event => {
        let nbBonnesReponses = 0
          let nbMauvaisesReponses = 0
          const nbBonnesReponsesAttendues = exercice.nbQuestions
        for (let i in exercice.autoCorrection) {
          const spanReponseLigne = document.querySelector(`#resultatCheckEx${exercice.numeroExercice}Q${i}`)
          if (document.getElementById(`champTexteEx${exercice.numeroExercice}Q${i}`).value === exercice.autoCorrection[i].reponse.value.toString()) {
            spanReponseLigne.innerHTML = '😎'
            nbBonnesReponses ++
          } else {
            spanReponseLigne.innerHTML = '☹️'
            nbMauvaisesReponses ++
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
