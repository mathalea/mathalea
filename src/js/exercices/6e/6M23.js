import ExerciceConversionsAires from './_Exercice_conversions_aires.js'
export const titre = 'Convertir des aires'

export { amcReady, interactifReady, amcType, interactifType } from './_Exercice_conversions_aires.js'
/**
 * @author Rémi Angot
 * référence 6M23
 *
*/
export const uuid = '6225c'
export const ref = '6M23'
export default function Reglages6M23 () {
  ExerciceConversionsAires.call(this)
  this.titre = titre
  this.interactif = false
  this.sup = 3
  this.nbColsCorr = 1
}
