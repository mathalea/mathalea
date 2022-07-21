import { context } from './context.js'

export function zoomAffichage (facteur) {
  let tailleH3 = 15
  let tailleH4 = 14
  let taille = 14
  taille *= facteur
  tailleH3 *= facteur
  tailleH4 *= facteur
  const divExercices = document.getElementById('exercices')
  const divCorrections = document.getElementById('corrections')
  divExercices.style.lineHeight = 'normal'
  divCorrections.style.lineHeight = 'normal'
  divExercices.style.fontSize = `${taille}px`
  divCorrections.style.fontSize = `${taille}px`
  if (context.vue === 'diap') {
    const questions = document.querySelectorAll('div.question')
    for (const question of questions) {
      question.style.fontSize = parseInt(question.dataset.taille) * taille + 'px'
    }
  }
  const tousLesH4 = document.querySelectorAll('#exercices h4') // Pour les énoncés
  const tousLesH3 = document.querySelectorAll('#exercices h3') // Pour les énoncés
  for (const enonce of tousLesH4) {
    enonce.style.fontSize = tailleH4 + 'px'
  }
  for (const enonce of tousLesH3) {
    enonce.style.fontSize = tailleH3 + 'px'
  }
  const qcms = document.querySelectorAll('.monQcm')
  for (const qcm of qcms) {
    qcm.style.fontSize = `${taille}px`
  }
  const tables = document.querySelectorAll('#affichage_exercices label') // Pour les propositions des QCM
  for (const table of tables) {
    table.style.fontSize = taille + 'px'
  }
  const figures = document.querySelectorAll('.mathalea2d')
  for (const figure of figures) {
    if (!figure.dataset.widthInitiale) figure.dataset.widthInitiale = parseFloat(figure.getAttribute('width'))
    if (!figure.dataset.heightInitiale) figure.dataset.heightInitiale = parseFloat(figure.getAttribute('height'))
    figure.setAttribute('height', figure.dataset.heightInitiale * facteur)
    figure.setAttribute('width', figure.dataset.widthInitiale * facteur)
  }
}
