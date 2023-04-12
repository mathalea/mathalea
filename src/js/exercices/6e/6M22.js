import ExercicePerimetresEtAires from './_Exercice_perimetres_et_aires.js'

export const titre = 'Calculer le périmètre et l\'aire de disques ou demi-disques'
export { interactifReady, interactifType, amcReady, amcType } from './_Exercice_perimetres_et_aires.js'

export const dateDeModificationImportante = '11/04/2023'

/** */
// Référence 6M22
export const uuid = 'ac571'
export const ref = '6M22'
export default function Reglages6M22 () {
  ExercicePerimetresEtAires.call(this)
  this.titre = titre
  this.sup = '4-5'
  this.exo = 'WithDisk'
  this.besoinFormulaireTexte = [
    'Types de figures (nombres séparés par des tirets)',
    '4 : Disque\n5 : Demi-disque'
  ]
}
