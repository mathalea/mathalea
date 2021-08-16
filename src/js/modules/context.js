// valeurs par défaut
export const context = {
  isHtml: true,
  isAmc: false,
  isDiaporama: false,
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
  nbMauvaisesReponses: 0
}

export function setOutputHtml () {
  context.isHtml = true
  context.isAmc = false
  context.isDiaporama = false
}
export function setOutputDiaporama () {
  context.isHtml = true
  context.isAmc = false
  context.isDiaporama = true
}
export function setOutputLatex () {
  context.isHtml = false
  context.isAmc = false
  context.isDiaporama = false
}
export function setOutputAmc () {
  context.isHtml = false
  context.isAmc = true
  context.isDiaporama = false
}
