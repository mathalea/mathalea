import Pythagore2D from './4G20.js'
// 4G20-1
export const titre = 'Donner ou compléter une égalité de Pythagore'
export const interactifReady = 1
export const interactifType = 'mathLive'

export default function EgalitePythagore2D () {
  Pythagore2D.call(this)
  this.sup = 1
  this.typeDeQuestion = ''
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 2, "1 : Donner l'égalité de Pythagore\n2 : Compléter l'égalité de Pythagore"]
}
