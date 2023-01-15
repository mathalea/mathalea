import PavagesEtTransformations from './_Pavages_et_transformations.js'

export const titre = 'Trouver l\'image d\'une figure par une symétrie axiale dans un pavage carré'
export { interactifReady, interactifType, amcReady, amcType } from '../6e/_Pavages_et_transformations.js'
export const dateDeModifImportante = '15/01/2023' //  Par EE

/**
 * Exercice en html seulement. Symétrie axiale dans un pavage.
 * @author Jean-Claude Lhote
 * référence 6G25-2
 * Relecture : Novembre 2021 par EE
 */
export const uuid = 'f5569'
export const ref = '6G25-2'
export default function PavagesEtSymetries () {
  PavagesEtTransformations.call(this)
  this.titre = titre
  this.level = 6
  this.besoinFormulaireNumerique = false
}
