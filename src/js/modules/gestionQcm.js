/* global $ */
export default function gestionQcm (exercice) {
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
          exercice.tableauPropositionsDuQcm[i].forEach((proposition, rep) => {
            const label = document.querySelector(`#labelEx${exercice.numeroExercice}Q${i}R${rep}`)
            const check = document.querySelector(`#checkEx${exercice.numeroExercice}Q${i}R${rep}`)
            if (exercice.tableauSolutionsDuQcm[i][rep] === 1) {
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
