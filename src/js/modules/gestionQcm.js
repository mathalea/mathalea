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
export function propositionsQcm (numeroExercice, i, tabrep, tabicone) {
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
      texte += `<br>  Réponses possibles : ${espace}  <form id="formEx${numeroExercice}Q${i}">`
    } else {
      texte += `<br>  Réponses possibles : ${espace}`
    }
    for (let rep = 0; rep < tabrep.length; rep++) {
      if (sortieHtml) {
        texte += `<div class="ui checkbox ex${numeroExercice}">
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
    if (sortieHtml) {
      texte += `<span id="resultatCheckEx${numeroExercice}Q${i}"></span></form>`
    }
  }
  return { texte: texte, texteCorr: texteCorr }
}
