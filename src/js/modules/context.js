// valeurs par défaut
export const context = {
  isHtml: true,
  isAmc: false,
  issortieNB: false,
  anglePerspective: 30,
  coeffPerspective: 0.5,
  pixelsParCm: 20,
  scale: 1,
  unitesLutinParCm: 50,
  isMainlevee: false,
  amplitude: 1,
  fenetreMathalea2d: [-1, -10, 29, 10],
  objets2D: [],
  graine: '',
  // duree: 10,
  nbBonnesReponses: 0,
  nbMauvaisesReponses: 0,
  zoom: 1,
  seedSpecial: false, // Change le numéro de série si une correction est cachée
  son: 0 // pour ajouter du son au changement de diapo dans le diaporama
}

export function setOutputHtml () {
  context.isHtml = true
  context.isAmc = false
}
export function setOutputMoodle () {
  context.isHtml = true
  context.isAmc = false
  context.isMoodle = true
}
export function setOutputLatex () {
  context.isHtml = false
  context.isAmc = false
}
export function setOutputAmc () {
  context.isHtml = false
  context.isAmc = true
}
export function setOutputAlc () {
  context.isHtml = false
  context.isAmc = false
  context.isAlc = true
}
