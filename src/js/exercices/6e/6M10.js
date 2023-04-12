import ExercicePerimetresEtAires from './_Exercice_perimetres_et_aires.js'
export const titre = 'Calculer le périmètre et l\'aire de polygones usuels'
export { interactifReady, interactifType, amcReady, amcType } from './_Exercice_perimetres_et_aires.js'

export const dateDeModificationImportante = '11/04/2023'

/**
 * @author Rémi Angot
 * Référence 6M10
 */
export const uuid = '83be1'
export const ref = '6M10'
export default function Reglages6M10 () {
  ExercicePerimetresEtAires.call(this)
  this.sup = '1-2-3'
  this.titre = titre
  this.exo = 'NoDisk'
  this.besoinFormulaire4CaseACocher = false
  this.besoinFormulaireTexte = [
    'Types de figures (nombres séparés par des tirets)',
    '1 : Carré\n2 : Rectangle\n3 : Triangle rectangle'
  ]
}
