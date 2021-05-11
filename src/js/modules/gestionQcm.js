/* global $ mathalea sortieHtml */

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
          let nbBonnesReponsesAttendues = 0
          for (let k=0; k<exercice.autoCorrection[i].propositions.length;k++){
            if (exercice.autoCorrection[i].propositions[k].statut) nbBonnesReponsesAttendues++
          }
          const spanReponseLigne = document.querySelector(`#resultatCheckEx${exercice.numeroExercice}Q${i}`)
          exercice.autoCorrection[i].propositions.forEach((prop, rep) => {
            const label = document.querySelector(`#labelEx${exercice.numeroExercice}Q${i}R${rep}`)
            const check = document.querySelector(`#checkEx${exercice.numeroExercice}Q${i}R${rep}`)
            if (prop.statut) {
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
            spanReponseLigne.innerHTML = '✔︎'
            spanReponseLigne.style.color = 'green'
          } else {
            spanReponseLigne.innerHTML = '✖︎'
            spanReponseLigne.style.color = 'red'
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
export function propositionsQcm (numeroExercice, i, propositions) {
  let texte = ''
  let texteCorr = ''
  let espace = ''
  if (sortieHtml) {
    espace = '&emsp;'
  } else {
    espace = '\\qquad'
  }
  if (!mathalea.sortieAMC) {
    if (sortieHtml) {
      texte += `<br>  <form id="formEx${numeroExercice}Q${i}">`
    } else {
      texte += '<br>'
    }
    for (let rep = 0; rep < propositions.length; rep++) {
      if (sortieHtml) {
        texte += `<div class="ui checkbox ex${numeroExercice} monQcm">
            <input type="checkbox" tabindex="0" class="hidden" id="checkEx${numeroExercice}Q${i}R${rep}">
            <label id="labelEx${numeroExercice}Q${i}R${rep}">${propositions[rep].texte + espace}</label>
          </div>`
      } else {
        texte += `$\\square\\;$ ${propositions[rep].texte}` + espace
      }
      if (propositions[rep].statut) {
        texteCorr += `$\\blacksquare\\;$ ${propositions[rep].texte}` + espace
      } else {
        texteCorr += `$\\square\\;$ ${propositions[rep].texte}` + espace
      }
    }
    if (sortieHtml) {
      texte += `<span id="resultatCheckEx${numeroExercice}Q${i}"></span></form>`
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
  let doublonsTrouves=false
  for (let i = 0; i < propositions.length - 1; i++) {
    for (let j = i + 1; j < propositions.length;) {
      if (propositions[i].texte === propositions[j].texte) {
        console.log('doublon trouvé') // les réponses i et j sont les mêmes
        doublonsTrouves=true
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
