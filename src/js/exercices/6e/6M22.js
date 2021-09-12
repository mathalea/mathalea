import ExercicePerimetresEtAires from './_Exercice_perimetres_et_aires.js'

export const titre = 'Périmètres et aires de disques (à partir d’un texte).'
export { interactifReady, interactifType, amcReady, amcType } from './_Exercice_perimetres_et_aires.js'

/** */
// Référence 6M22
export default function Reglages6M22 () {
  ExercicePerimetresEtAires.call(this)
  this.sup = 2
  this.titre = titre
  }
