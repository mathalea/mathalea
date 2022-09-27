import ExercicePerimetresEtAires from './_Exercice_perimetres_et_aires.js'

export const titre = 'Calculer périmètre et aire de disques (à partir d\'un texte)'
export { interactifReady, interactifType, amcReady, amcType } from './_Exercice_perimetres_et_aires.js'

/** */
// Référence 6M22
export const uuid = 'ac571'
export const ref = '6M22'
export default function Reglages6M22 () {
  ExercicePerimetresEtAires.call(this, 4)
  this.titre = titre
  this.besoinFormulaireTexte = false
}
